import downloader from './downloader'
import _ from 'lodash'

export default {
	/**
	 *
	 * @param {String} packageName
	 */
	getPackageFiles(packageName) {
		// validate parameters
		if (!packageName) {
			console.error('Error in getPackageFiles(). No packageName was given.')
			return false
		}

		// define package-files (from given downloadPackage-name)
		let packageFiles = fg.contentFilesList.filter(function (value, key) {
			if (value[packageName] == '1') return true
		})

		// return files
		return packageFiles
	},

	/**
	 *
	 * @param {String} packageName
	 * @param {Array} additionalFiles
	 * @param {Function} success
	 */
	initPackageDownloader(packageName, additionalFiles, success) {
		// get package-files
		let packageFiles = this.getPackageFiles(packageName)
		if (!packageFiles) return

		if (packageFiles && additionalFiles) {
			packageFiles.push(...additionalFiles)
		}

		// if this package-downloader is already exists -> return existing downloader
		if (fg.m.Downloader.allDownloaders[packageName]) {
			// return existing downloader
			return fg.m.Downloader.allDownloaders[packageName]
		}

		// create file-downloader
		let downloadPackageDownloader = downloader.initDownloader(packageFiles, packageName, function () {
			// add to "downloaded-packages"
			fg.state.m.Downloader.downloadedPackages.push(packageName)
			localStorage.downloadedPackages = JSON.stringify(fg.state.m.Downloader.downloadedPackages)

			// Destroy content downloader when finished
			if (packageFiles.length) {
				downloadPackageDownloader.destroy()
			}

			if (success) success()
		})

		// return downloader
		return downloadPackageDownloader

		// // OPTIONAL - add "additional-files" to download-files
		// if (_.isArray(additional_files)) {
		//     package_files = package_files.concat(additional_files);
		// }
	},

	/**
	 *
	 * @param {String} packageName
	 */
	getPackageSize(packageName) {
		// get package-files
		let packageFiles = this.getPackageFiles(packageName)
		if (!packageFiles) return

		// calculate file-size
		var bytes = _.sum(_.map(packageFiles, 'size'))
		// var kbytes = Math.round(bytes / 1024);
		// var mbytes = Math.round(bytes / 1024 / 1024);
		let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
		if (bytes == 0) {
			return '0 Byte'
		}
		let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
	},

	/**
	 *
	 * @param {String} packageName
	 */
	deletePackage(packageName, success) {
		// get package-files
		let packageFiles = this.getPackageFiles(packageName)
		if (!packageFiles) return

		// define success function
		success = success || function () {}

		// exit for web-app - simulate deleting download-package
		if (fg.state.device.isWebapp) {
			//// remove package from downloaded
			// get download-packages from localstorage
			let downloadedPackages = localStorage.downloadedPackages
			if (downloadedPackages == undefined) downloadedPackages = []
			else downloadedPackages = JSON.parse(downloadedPackages)
			// update downloaded-packages
			_.pull(downloadedPackages, packageName)
			// save into localstorage
			localStorage.downloadedPackages = JSON.stringify(downloadedPackages)
			// save into state
			window.fg.state.m.Downloader.downloadedPackages = downloadedPackages
			// run custom success-callback
			success()
			// exit
			return
		}

		// get files to delete (from all_files_on_device)
		let package_files = _.filter(fg.contentFilesList, function (value, key) {
			if (value[packageName] == '1') return true
		})

		// get only the urls
		let package_files_urls = _.map(package_files, function (pf) {
			return pf.url
		})

		// delete these files
		if (_.size(package_files) > 0) {
			fg.m.Filemanager.cordova_delete_files(package_files_urls, function () {
				//// remove package from downloaded
				// get download-packages from localstorage
				let downloaded_packages = localStorage.downloadedPackages
				if (downloaded_packages == undefined) downloaded_packages = []
				else downloaded_packages = JSON.parse(downloaded_packages)
				// update downloaded-packages
				_.pull(downloaded_packages, packageName)
				// save into localstorage
				localStorage.downloadedPackages = JSON.stringify(downloaded_packages)

				// run custom success-callback
				success()
			})
		} else {
			//// remove package from downloaded
			// get download-packages from localstorage
			let downloaded_packages = localStorage.downloadedPackages
			if (downloaded_packages == undefined) downloaded_packages = []
			else downloaded_packages = JSON.parse(downloaded_packages)
			// update downloaded-packages
			_.pull(downloaded_packages, packageName)
			// save into localstorage
			localStorage.downloadedPackages = JSON.stringify(downloaded_packages)
			// run custom success-callback
			success()
		}
	},
}
