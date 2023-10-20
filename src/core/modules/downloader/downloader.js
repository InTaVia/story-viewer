/* eslint-disable no-var */
/* eslint-disable camelcase */

//// imports
import core from './../../core.js'
import { reactive } from 'vue'
import _ from 'lodash'
import appSettings from './../../../app/app.settings.js' // app-settings for debug

export default {
	/**
	 * init module
	 */
	init() {
		// init localstorage (if corrupt)
		if (
			localStorage.downloadedPackages == '' ||
			localStorage.downloadedPackages == 'null' ||
			localStorage.downloadedPackages == 'undefined'
		)
			delete localStorage.downloadedPackages

		//// init state & settings
		window.fg.state.m.Downloader = {
			// settings
			settings: {
				retry_download_after_error_count: 3,
				retry_download_after_error_count_inhouse: 10,
			},
			downloadedPackages: localStorage.downloadedPackages ? JSON.parse(localStorage.downloadedPackages) : [],
		}
		// map global module-state and module-settings directly to module-scope
		this.state = window.fg.state.m.Downloader
		this.settings = window.fg.state.m.Downloader.settings

		//// Module globals
		this.temp = {}
		// allDownloaders
		this.allDownloaders = reactive({})
	},

	////////////////////////////////////////////////////
	// initDownloader(files, downloaderID, options)
	// DESCRIPTION: download files (will create new instance of downloader)
	// NOTE: files_array MUST be this format: [ {"url": "path/to/file.jpg", "size": 123, "moddate": 1414074613} , {"url": "https://whatever.com/external_file.png"}]
	////////////////////////////////////////////////////
	initDownloader: function (files, downloaderID, success) {
		// success-callback
		success = success || function () {}

		// check given "files"
		if (_.isArray(files) == false) {
			console.warn("[Fluxguide Core/Filemanager] Filemanager.downloadFiles(): Parameter 'files' is not an Array.")
			return
		}

		// "files" is empty array -> instantly call success (TODO: also mark finished download in downloader-state)
		if (!(files.length > 0)) {
			success()
			return
		}

		// define "downloaderID" (if not given -> create a unique ID)
		downloaderID = downloaderID || Math.round(new Date().getTime() / 1) + _.uniqueId()

		// SPECIAL CASE - this downloader-ID does already exists -> reset it
		// TODO -> do this in the right way
		if (fg.m.Downloader.allDownloaders[downloaderID]) {
			// TODO -> RESET EXISTING DOWNLOADER ??
		}

		//// process file-list
		// process - STEP 1: define "file.url_on_server" and "file.url_on_device"
		files = _.map(files, function (file) {
			// NOTES: there are THREE types of urls:
			//      - content-files (from fluxguide-API-server) -> these are files that are given with public/content.... -> e.g. "public/content/fluxguide/exhibitions/1/test.png"
			//      - app-files (from fluxguide-app-server) -> these are files that has the "is_app_file"-flag - e.g. "assets/box.2639e0ee.png"
			//      - external urls (from external server) -> these are files that are given with http(s).... - e.g. "https://www.whatever.com/pretty_pic.png"

			//// CASE 1 - this is external-url
			// find out if this is external url (starts with "http://...")
			var is_external_url = /^http(s*):\/\//.test(file.url)
			if (is_external_url) {
				// define url on server (will be used for download)
				file.url_on_server = file.url
				//// define url on device (will be used for internal file-storing) - clean up messy foldername
				// get url-path (without filename)
				var pos = file.url.lastIndexOf('/')
				var url_path_without_filename = file.url.substring(0, pos)
				var filename_only = file.url.substr(file.url.lastIndexOf('/') + 1)
				filename_only = filename_only.toLowerCase()
				// TODO: clean filename for special characters!!
				// add "external_url"
				file.external_url = file.url
				//// clean foldername
				// cut out http:// or https:// - if path is a link
				url_path_without_filename = url_path_without_filename.replace('http://', '')
				url_path_without_filename = url_path_without_filename.replace('https://', '')
				// define url on device (will be used for internal file-storing) - clean up messy foldername
				file.url_on_device =
					url_path_without_filename.replace(/[^\w\s\/]/gi, '').toLowerCase() + '/' + filename_only
			}

			//// CASE 2 - is fluxguide-app-file (from fluxguide-app-server)
			else if (file.is_app_file == '1') {
				// define url on server (will be used for download)
				if (fg.state.device.isCordova) file.url_on_server = fgCordova.settings.base_url_app + file.url
				// special for web-app (emulating file-download) - TODO - do we need this?
				else file.url_on_server = fg.state.baseUrl + file.url
				// define url on device (will be used for internal file-storing)
				file.url_on_device = 'fluxguide_app' + '/' + file.url
			}

			//// CASE 3 - is fluxguide-API-file (from fluxguide-API-server)
			else if (file.url.startsWith('public/')) {
				// define url on server (will be used for download)
				file.url_on_server = fg.state.baseUrl + file.url
				// define url on device (will be used for internal file-storing)
				file.url_on_device = 'fluxguide_content' + '/' + file.url
			}

			// return file
			return file
		})

		//// process - STEP 2: define files that really needs to be downloaded (from downloader.files)
		// make "filename to moddate"-table (for faster lookup)
		if (fg.state.device.isCordova) {
			var existing_files_moddate = {}
			fgCordova.all_files_on_device.forEach((file) => {
				existing_files_moddate[file.url] = file.moddate
			})
		}
		// filter files
		files = _.filter(files, function (file) {
			// special for web-app (emulating content-download)
			if (fg.state.device.isWebapp) return true
			// init "download_it"-flag
			var download_it = false
			// CASE - file already exists on device -> check if file-moddate is still up-to-date
			if (existing_files_moddate[file.url]) {
				// CASE - file-moddate has NOT changed -> skip download
				if (
					existing_files_moddate[file.url] == file.moddate &&
					file.moddate != 0 &&
					file.moddate != undefined
				)
					download_it = false
				// CASE - file-moddate has changed (or NO moddate given) -> download file
				else download_it = true
			}
			// CASE - file does NOT exist on device yet -> download file
			else download_it = true
			// return flag for lodash-filter
			return download_it
		})

		//// downloader CLASS
		class downloaderClass {
			// class-constructor
			constructor(files, downloaderID, success) {
				// define main parameter
				this.files = files
				this.downloaderID = downloaderID
				this.success = success
				if (fg.state.device.isCordova) this.filetransfer = new FileTransfer()

				// define download-state (reactive) - these can be used in your vue-template/app
				this.state = reactive({
					downloader_is_active: false,
					current_download_index: 0,
					current_downloaded_bytes: 0,
					total_download_filecount: files.length,
					total_download_bytes: _.sum(_.map(files, 'size')),
					total_download_percent: 0,
					count_download_errors: 0,
				})
			}

			// PUBLIC DOWNLOADER-METHODS

			// start download
			start() {
				// define this
				const downloader = this
				// mark downloader as active
				downloader.state.downloader_is_active = true
				// start downloading
				downloader.download_next_file()
			}

			// pause download
			pause() {
				// define this
				const downloader = this
				// mark downloader as paused
				downloader.state.downloader_is_active = false
			}

			// // stop download
			// stop() {
			//     // define this
			// 	const downloader = this;
			//     // mark downloader as paused
			//     downloader.state.downloader_is_active = false;
			//     // start downloading
			//     downloader.download_next_file();
			// };

			// cancel_download
			cancel_download() {
				// define this
				const downloader = this

				// stop current filetransfer
				try {
					downloader.filetransfer.abort()
				} catch (e) {
					// If filetransfer exists (on device)
					if (downloader.filetransfer) {
						console.warn('abort failed', downloader.downloaderID)
					}
					// else: online case (no actual file download)
				}
				// TODO: roll back? -> remove dp-package-files that were already downloaded?
			}

			// destroy()
			destroy() {
				// define this
				const downloader = this
				// cancel running download
				downloader.cancel_download()
				// destroy Instance
				window.setTimeout(function () {
					if (fg.m.Downloader.allDownloaders[downloaderID] == undefined) return
					fg.m.Downloader.allDownloaders[downloaderID].state = null
					fg.m.Downloader.allDownloaders[downloaderID] = null
					// remove from all-audioplayers
					delete fg.m.Downloader.allDownloaders[downloaderID]
				}, 50)
			}

			// INTERNAL DOWNLOADER-METHODS

			// (1) - download_next_file() - start downloading the next single file
			download_next_file() {
				// define this
				const downloader = this
				if (!downloader.state) {
					return
				}
				// CASE 1 - downloader has been stopped -> stop downloading next file
				else if (downloader.state.downloader_is_active !== true) {
					return
				}
				// CASE 2 - DOWNLOAD FINISHED - all files has been downloaded -> success-callback
				if (downloader.state.current_download_index >= downloader.state.total_download_filecount) {
					// mark downloader as done
					downloader.state.downloader_is_active = false
					// success callback
					downloader.success()
					// TODO - destroy filemanager-instance afterwards (for memory-issues) and remove from fg.downloader -- but not instantly
					//downloader.destroy();
				}
				// CASE 3 -  download NEXT file
				else downloader.prepare_file_download()
			}

			// (2) - prepare_file_download() - check/create folder before downloading
			prepare_file_download() {
				// define this
				const downloader = this
				// get current file
				var file = downloader.files[downloader.state.current_download_index]

				// special for web-app -> emulate content-download
				if (fg.state.device.isWebapp) {
					// update download-index
					downloader.state.current_download_index++
					// calculate total download-size
					downloader.state.current_downloaded_bytes += file.size
					//// update progress
					// use filesize
					if (downloader.state.total_download_bytes > 0 && file.size > 0)
						downloader.state.total_download_percent = Math.round(
							(100 / downloader.state.total_download_bytes) * downloader.state.current_downloaded_bytes
						)
					// use filecount (when no filesize is available)
					else
						downloader.total_download_percent = Math.round(
							(downloader.state.current_download_index / downloader.state.total_download_filecount) * 100
						)
					// download next file
					window.setTimeout(function () {
						downloader.download_next_file()
					}, appSettings.contentDownloadEmulationFileTimeout)
					// exit
					return
				}

				//// create folder and then download file
				// get folder-path (without filename)
				var pos = file.url_on_device.lastIndexOf('/')
				var device_folderpath_full = file.url_on_device.substring(0, pos)
				// TODO -> check if this is a performance-issue (because it is done with EVERY file)
				fg.m.Filemanager.directory_exists(
					device_folderpath_full,
					// folder exists -> download file
					function () {
						downloader.download_into_device_memory()
					},
					// folder does NOT exist -> create folder first
					function () {
						fg.m.Filemanager.create_directory(device_folderpath_full, function () {
							// download file
							downloader.download_into_device_memory()
						})
					}
				)
			}

			// (3) - download_into_device_memory()
			download_into_device_memory() {
				// define this
				const downloader = this
				// define file to download
				var file = downloader.files[downloader.state.current_download_index]

				// get file-entry
				fgCordova.device_directoryEntry.getFile(
					file.url_on_device,
					{ create: true, exclusive: false },
					function (fileEntry) {
						//// get local filename
						var localPath = fileEntry.nativeURL
						// download file
						downloader.filetransfer.download(
							file.url_on_server,
							fileEntry.nativeURL,
							// CASE - download success
							function (entry) {
								//// update fgCordova.all_files_on_device
								// remove this file from existing-file-list (if it exists)
								_.remove(fgCordova.all_files_on_device, function (file_record) {
									return file.url_on_device.indexOf(file_record.url) > -1
								})
								// delete "ipawww"-tag from this file (if exists)
								delete file.ipa
								// add this file to file-list
								fgCordova.all_files_on_device.push(file)
								// write all_file_on_device.json on device
								fg.m.Filemanager.cordova_write_file(
									'all_files_on_device.json',
									JSON.stringify(fgCordova.all_files_on_device),
									function () {
										// increment downloaded-files-counter
										downloader.state.current_download_index++
										// calculate total download-size
										downloader.state.current_downloaded_bytes += file.size
										//// update progress
										// use filesize
										if (downloader.state.total_download_bytes > 0 && file.size > 0)
											downloader.state.total_download_percent = Math.round(
												(100 / downloader.state.total_download_bytes) *
													downloader.state.current_downloaded_bytes
											)
										// use filecount (when no filesize is available)
										else
											downloader.total_download_percent = Math.round(
												(downloader.state.current_download_index /
													downloader.state.total_download_filecount) *
													100
											)
										// download next file
										downloader.download_next_file()
									},
									// error-callback of cordova_write_file()
									function () {
										console.log(
											'Error while writing all_files_on_device.json after download was finished. ',
											file
										)
									}
								)
							},

							// CASE - download error
							function (err) {
								// increment download-errors
								downloader.state.count_download_errors++
								// error CASE - wait and repeat download (only if download has not been canceled on purpose (cancel_download_flag))
								if (fg.state.device.isInhouseApp)
									var retry_count = fg.m.Downloader.settings.retry_download_after_error_count_inhouse
								else var retry_count = fg.m.Downloader.settings.retry_download_after_error_count
								if (
									downloader.state.count_download_errors <= retry_count &&
									downloader.cancel_download_flag != true
								) {
									window.setTimeout(function () {
										downloader.download_into_device_memory()
									}, 1000)
								}
								// error CASE - too many errors -> abort download
								else {
									downloader.error_callback()
								}
							}
						)
					},
					function (error) {
						fg.m.Filemanager.fail(error, 'download error with file: ' + file.url_on_server)
					}
				)
			}
		}
		// Downloader-class END

		// create downloader-instance (from class that was just defined)
		fg.m.Downloader.allDownloaders[downloaderID] = new downloaderClass(files, downloaderID, success)

		// return the downloader
		return fg.m.Downloader.allDownloaders[downloaderID]
	},

	////////////////////////////////////////////////////
	// getInitDownloadFilelist()
	// DESCRIPTION: define file-list for init download
	////////////////////////////////////////////////////
	getInitDownloadFilelist: function () {
		//// get app-files (these are the "assets"-files from custom-app-project)
		if (fg.state.device.isCordova) var app_files = fgCordova.app_files_list
		// special for web-app (emulating file-download)
		else var app_files = []

		//// define content-files that need to be downloaded
		// CASE - inhouse app -> download all languages (of current exhibition)
		if (fg.state.device.isInhouseApp) {
			var exhibition_filter_string = 'E_' + fg.state.exhibitionId
			var content_files_list = _.filter(fg.contentFilesList, function (file) {
				if (file[exhibition_filter_string] == '1') return true
			})
		}
		// CASE - appstore-app -> rules for download: (1) only active-language/active-exhibition, (2) "download_on_start"-flag is set, (3) exclude download-package-files if not downloaded before
		else {
			var exhibition_filter_string = 'E_' + fg.state.exhibitionId
			var language_filter_string = 'L_' + fg.state.visitor.languageId
			// loop all content-files and decide which files should be downloaded
			var content_files_list = _.filter(fg.contentFilesList, function (file) {
				// init "prevent_download"-flag (default is false)
				var prevent_download = false
				// CASE - this file is download-package-file -> only download file if this package already was downloaded by user
				if (file['dp'] == '1') {
					prevent_download = true

					// localStorage.downloadedPackages ? JSON.parse(localStorage.downloadedPackages) : []

					let downloadedPackages
					// loop all visitors download-packages
					if (!localStorage.downloadedPackages) downloadedPackages = []
					else downloadedPackages = JSON.parse(localStorage.downloadedPackages)
					_.each(downloadedPackages, function (downloadPackageName) {
						if (file[downloadPackageName] == '1') prevent_download = false
					})
					// console.log("false");
				}
				// CASE - this is a normal ("non-download-package") file -> prevent download only if "prevent"-flag is set
				else {
					if (file['download_on_start'] != '1') prevent_download = true
					// console.log("true");
				}
				// last check -> only if filedownload should not be prevented & language + exhibition is correct -> download it
				if (
					file[exhibition_filter_string] == '1' &&
					file[language_filter_string] == '1' &&
					prevent_download == false
				) {
					return true
				}
			})
		}

		// merge app-files and content-files;
		let downloadFilesList = content_files_list.concat(app_files)

		// return file-list
		return downloadFilesList
	},

	//// DOWNLOAD PACKAGES

	////////////////////////////////////////////////////
	// delete_package(package_title, options)
	// DESCRIPTION: delete a package
	////////////////////////////////////////////////////
	delete_package: function (package_title, success_callback) {
		// validate parameters
		if (package_title == '') return
		if (package_title.substr(0, 3) != 'dp_') package_title = 'dp_' + package_title
		success_callback = success_callback || function () {}

		// exit for web-app - simulate deleting download-package
		if (!fg.device.is_phonegap) {
			//// remove package from downloaded
			// get download-packages from localstorage
			var downloaded_packages = localStorage.downloaded_packages
			if (downloaded_packages == undefined) downloaded_packages = []
			else downloaded_packages = JSON.parse(downloaded_packages)
			// update downloaded-packages
			_.pull(downloaded_packages, package_title)
			// save into localstorage
			localStorage.downloaded_packages = JSON.stringify(downloaded_packages)
			// run custom success-callback
			success_callback()
			return
		}

		// get files to delete (from all_files_on_device)
		var package_files = _.filter(fg.active_files, function (value, key) {
			if (value[package_title] == '1') return true
		})

		// get only the urls
		var package_files_urls = _.map(package_files, function (pf) {
			return pf.url
		})

		// delete these files
		if (_.size(package_files) > 0) {
			fg.modules.Filemanager.cordova_delete_files(package_files_urls, function () {
				//// remove package from downloaded
				// get download-packages from localstorage
				var downloaded_packages = localStorage.downloaded_packages
				if (downloaded_packages == undefined) downloaded_packages = []
				else downloaded_packages = JSON.parse(downloaded_packages)
				// update downloaded-packages
				_.pull(downloaded_packages, package_title)
				// save into localstorage
				localStorage.downloaded_packages = JSON.stringify(downloaded_packages)

				// run custom success-callback
				success_callback()
			})
		} else {
			//// remove package from downloaded
			// get download-packages from localstorage
			var downloaded_packages = localStorage.downloaded_packages
			if (downloaded_packages == undefined) downloaded_packages = []
			else downloaded_packages = JSON.parse(downloaded_packages)
			// update downloaded-packages
			_.pull(downloaded_packages, package_title)
			// save into localstorage
			localStorage.downloaded_packages = JSON.stringify(downloaded_packages)
			// run custom success-callback
			success_callback()
		}
	},
}
