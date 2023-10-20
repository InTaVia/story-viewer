<template>
	<div class="loading-screen">
		<div class="loading-screen-content">
			<div class="loading-screen-download">
                <div>CONTENT: <span v-if="fg.state.start.contentLoaded">READY</span><span v-else>loading...</span></div>
                <div>CONTENT-STOPS: <span v-if="fg.state.start.contentStopsLoaded">READY</span><span v-else>loading...</span></div>
                <div>ACTIVE-FILE-LIST: <span v-if="fg.state.start.filesListLoaded">READY</span><span v-else>loading...</span></div>
                <div>ALL-FILES-ON-DEVICE-LIST-LOADED: <span v-if="fg.state.start.allFilesOnDeviceLoaded">READY</span><span v-else>loading...</span></div>
                <div>VISITOR: <span v-if="fg.state.start.visitorDataLoaded">READY</span><span v-else>loading...</span></div>
                <div>CONTENT-FILES-DOWNLOAD: <span v-if="fg.state.start.contentDownloadFinished">READY</span><span v-else>loading...</span></div>

                <div>STATUS: 
                    <span v-if="downloader.state.downloader_is_active">DOWNLOAD IN PROGRESS...</span>
                    <span v-else>DOWNLOAD FINISHED</span>
                </div>
                <div>FILES: {{downloader.state.current_download_index}} / {{downloader.state.total_download_filecount}}</div>
                <div>BYTES: {{downloader.state.current_downloaded_bytes}} / {{downloader.state.total_download_bytes}}</div>
                <div>PERCENT: {{downloader.state.total_download_percent}} %</div>
                <div style="color:red;" v-if="downloader.state.count_download_errors > 0">ERRORS: {{downloader.state.count_download_errors}}</div>

			</div>

		</div>
	</div>
</template>



<script>
import core from '../../core/core.js';

export default {
  data() {
    return {
      downloader: {}
    }
  },
  computed: {

  },
  created() {
    const vm = this;

    // define file-list for init download
    let fileList = fg.m.Downloader.getInitDownloadFilelist();
    // create downloader (and start download)
    vm.downloader = fg.m.Downloader.initDownloader(fileList, 'InitDownloader', function(){
        // set "content-download-finished"-flag
        fg.state.start.contentDownloadFinished = true;
        // set "app-is-running"-flag
        fg.state.start.appIsRunning = true;
        // trigger "appIsRunning"-event (this will kick in your custom application)
        fg.trigger('appIsRunning');
    });
    // start downloader
    vm.downloader.start();

  }
}
</script>


