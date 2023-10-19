export default {
	init() {
		if (!fg.m.Videoplayer) {
			fg.m.Videoplayer = {
				allVideoplayers: {},
				pauseAll: this.pauseAll,
			};
		}
	},

	pauseAll() {
		for (const video of Object.values(fg.m.Videoplayer.allVideoplayers)) {
			video.pause();
		}
	},
};
