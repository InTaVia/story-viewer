<template>
	<div style="width: 100%; height: 100%; overflow: scroll">
		<!-- Loop all Download Packages -->
		<div v-for="downloadPackage in downloadPackages" :key="downloadPackage.tourID" class="download_package_record">
			<!-- Package Title -->
			<h2>{{ downloadPackage.title }}</h2>

			<!-- DOWNLOADER-STATE 1 - "Download" -->
			<button
				v-if="
					!fg.state.m.Downloader.downloadedPackages.includes(downloadPackage.packageName) &&
					!allDownloaders[downloadPackage.packageName]
				"
				@click="startDownloadPackage(downloadPackage.packageName)"
			>
				⬇ DOWNLOAD [{{ getPackageSize(downloadPackage.packageName) }}]
			</button>

			<!-- DOWNLOADER-STATE 2 - "is downloading" -->
			<div
				v-if="
					allDownloaders[downloadPackage.packageName] &&
					allDownloaders[downloadPackage.packageName].state &&
					allDownloaders[downloadPackage.packageName].state.downloader_is_active
				"
			>
				🔄 PROGRESS: {{ allDownloaders[downloadPackage.packageName].state.total_download_percent }} % <br />
				<button @click="cancelDownloadPackage(downloadPackage.packageName)">CANCEL</button>
			</div>

			<!-- DOWNLOADER-STATE 3 - "Download finished" -->
			<div v-if="fg.state.m.Downloader.downloadedPackages.includes(downloadPackage.packageName)">
				✔️ DOWNLOADED
				<button class="red" @click="deleteDownloadPackage(downloadPackage.packageName)">DELETE PACKAGE</button>
			</div>

			<!-- (just for check) CONTENT-SLIDER FOR TOUR 3 -->
			<SliderGallery
				:slides="slides[downloadPackage.tourID]"
				:is-teleported="{ toElement: '#app-container' }"
			></SliderGallery>
		</div>
	</div>
</template>

<script>
import SliderGallery from './../../components/slidergallery/SliderGallery.vue';

export default {
	components: {
		SliderGallery,
	},
	data() {
		return {
			downloadPackages: [
				{ tourID: '0', title: 'Tier-Tour', packageName: 'dp_tour_1' },
				{ tourID: '1', title: 'Baby Tier-Tour', packageName: 'dp_tour_3' },
			],

			allDownloaders: fg.m.Downloader.allDownloaders,

			slides: [
				[
					{ image: { url: 'public/content/fluxguide/exhibitions/1/seepferd-images.jpg' }, isImage: true },
					{ image: { url: 'public/content/fluxguide/exhibitions/1/giraffe-images.jpg' }, isImage: true },
					{ image: { url: 'public/content/fluxguide/exhibitions/1/firefox-images.jpg' }, isImage: true },
				],
				[
					{ image: { url: 'public/content/fluxguide/exhibitions/1/babyelefant-images.jpg' }, isImage: true },
					{ image: { url: 'public/content/fluxguide/exhibitions/1/baby-lowe-images.jpg' }, isImage: true },
					{ image: { url: 'public/content/fluxguide/exhibitions/1/firefox-images.jpg' }, isImage: true },
				],
			],
		};
	},
	methods: {
		// getSlides(id) {
		//     return
		// },

		startDownloadPackage(packageName) {
			// create "downloading package"-downloader
			let downloader = fg.m.Downloader.initPackageDownloader(packageName);
			// start downloading
			downloader.start();
		},

		getPackageSize(packageName) {
			return fg.m.Downloader.getPackageSize(packageName);
		},

		cancelDownloadPackage(packageName) {
			// stop downloader
			fg.m.Downloader.allDownloaders[packageName].destroy();
		},

		deleteDownloadPackage(packageName) {
			// delete DownloadPackage
			fg.m.Downloader.deletePackage(packageName);
		},
	},
};
</script>

<style scoped>
.download_package_record {
	margin: 10px 0px 10px 0px;
	padding: 10px 0px 40px 0px;
	border-bottom: 3px solid #ccc;
}

button {
	border: 1px solid #ccc;
	color: #fff;
	background-color: #006699;
	padding: 10px 10px 10px 10px;
	margin-bottom: 10px;
}

button.red {
	background-color: red;
	font-size: 9px;
}
</style>
