<template>
	<div class="loading-screen">
		<!-- Download or Skip question -->
		<div v-if="showDownloadRequestPopup" class="download-request-popup">
			<h2>Do you want to download the content?</h2>
			<button @click="startDownload">Download</button>
			<br />
			<button @click="setDownloadFinished">Skip download</button>
		</div>
		<div v-else class="loading-screen-content">
			<!-- Downloader overlay - show data like progress and mb -->
			<div v-if="downloader" class="loading-screen-download">
				<div>CONTENT: <span v-if="fg.state.start.contentLoaded">READY</span><span v-else>loading...</span></div>
				<div>
					CONTENT-STOPS: <span v-if="fg.state.start.contentStopsLoaded">READY</span
					><span v-else>loading...</span>
				</div>
				<div>
					ACTIVE-FILE-LIST: <span v-if="fg.state.start.filesListLoaded">READY</span
					><span v-else>loading...</span>
				</div>
				<div>
					ALL-FILES-ON-DEVICE-LIST-LOADED: <span v-if="fg.state.start.allFilesOnDeviceLoaded">READY</span
					><span v-else>loading...</span>
				</div>
				<div>
					VISITOR: <span v-if="fg.state.start.visitorDataLoaded">READY</span><span v-else>loading...</span>
				</div>
				<div>
					CONTENT-FILES-DOWNLOAD: <span v-if="fg.state.start.contentDownloadFinished">READY</span
					><span v-else>loading...</span>
				</div>

				<div>
					STATUS:
					<span v-if="downloader.state.downloader_is_active">DOWNLOAD IN PROGRESS...</span>
					<span v-else>DOWNLOAD FINISHED</span>
				</div>
				<div>
					FILES: {{ downloader.state.current_download_index }} /
					{{ downloader.state.total_download_filecount }}
				</div>
				<div>
					BYTES: {{ formatBytes(downloader.state.current_downloaded_bytes) }} /
					{{ formatBytes(downloader.state.total_download_bytes) }}
				</div>
				<div>PERCENT: {{ downloader.state.total_download_percent }} %</div>
				<div v-if="downloader.state.count_download_errors > 0" style="color: red">
					ERRORS: {{ downloader.state.count_download_errors }}
				</div>
			</div>

			<!-- Start animation - gets always shown for the appSettings.downloaderMinDuration-->
			<div v-if="showStartAnimation || downloader" class="start-animation">
				<p>~~~ start animation ~~~</p>
			</div>
		</div>
	</div>
</template>

<script>
import appSettings from '../../app.settings';



export default {
	data() {
		return {
			downloader: null,
			showDownloadRequestPopup: true,
			startShowTime: null,
			showStartAnimation: false,
		};
	},
	mounted() {
		// set "content-download-finished"-flag
		fg.state.start.contentDownloadFinished = true;
		// set "app-is-running"-flag
		fg.state.start.appIsRunning = true;
		fg.state.visitor.languageId = 1;
		// trigger "appIsRunning"-event (this will kick in your custom application)
		fg.trigger('appIsRunning');
	},
	methods: {
		startDownload() {
			const vm = this;

			// Hide download request popup
			vm.showDownloadRequestPopup = false;

			this.startShowTime = new Date();

			// define file-list for init download
			const fileList = fg.m.Downloader.getInitDownloadFilelist();

			if (fileList.length > 0) {
				// create downloader (and start download)
				vm.downloader = fg.m.Downloader.initDownloader(fileList, 'InitDownloader', function () {
					vm.setDownloadFinished();
				});

				// start downloader
				vm.downloader.start();
			} else {
				// No content-files to download
				vm.setDownloadFinished();
			}
		},
		setDownloadFinished() {
			this.showDownloadRequestPopup = false;

			let remainingShowDuration = null;
			// CASE "download skipped" - show full minimum duration
			if (!this.startShowTime) {
				remainingShowDuration = appSettings.downloaderMinDuration;
				this.showStartAnimation = true;
			}
			// CASE download started - show remaining minimum duration
			else if (this.startShowTime) {
				remainingShowDuration = appSettings.downloaderMinDuration - (new Date() - this.startShowTime);
				remainingShowDuration > 0 ? (this.showStartAnimation = true) : (remainingShowDuration = 0);
			}

			setTimeout(() => {
				// set "content-download-finished"-flag
				fg.state.start.contentDownloadFinished = true;
				// set "app-is-running"-flag
				fg.state.start.appIsRunning = true;
				// trigger "appIsRunning"-event (this will kick in your custom application)
				fg.trigger('appIsRunning');
			}, remainingShowDuration);
		},
		formatBytes(bytes) {
			let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			let i = Math.floor(Math.log(bytes) / Math.log(1024));
			let output = ((bytes / Math.pow(1024, i)).toFixed(2) * 1).toLocaleString() + ' ' + sizes[i];
			
			if(isFinite(i)) {
				return output;
			}
			return '0 KB';
		},
	},
};
</script>
