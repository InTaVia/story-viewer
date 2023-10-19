import { defineConfig } from 'vite'; // import vite.js
import vue from '@vitejs/plugin-vue'; // import vite-vue-plugin
import svgLoader from 'vite-svg-loader'; // import vite-svg-loader
import rollupCommand from 'rollup-plugin-command'; // import rollup-plugin command
import path from 'path';


// vite.js configuration (see https://vitejs.dev/config)
export default defineConfig({
	// define base-url for build (can also be done via commandline - vite build --base=/fluxguide/public/fluxguide-core-app/dist/)
	base: './',

	// dev server options
	server: {
		host: "0.0.0.0",
		port: 3000,
		open: true
	},

	// build options
	build: {
		minify: false,
		// define output foldername
		outDir: 'dist',
		// all CSS in the entire project will be extracted into a single CSS file
		cssCodeSplit: false,
		// Vite will empty the outDir on build
		emptyOutDir: true,
		// disable brotli-compressed size reporting
		brotliSize: false,
		// Limit for chunk size warnings (in kbs)
		chunkSizeWarningLimit: 10000,

		// rollup options
		rollupOptions: {
			// // remove hashes from filenames
			// output: {
			//   chunkFileNames: "assets/[name].js",
			//   assetFileNames: "assets/[name][extname]",
			//   entryFileNames: "assets/[name].js"
			// }
		},
	},

	// define plugins
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: tag => tag === 'lottie-player'
				}
			}
		}), // vue-plugin
		svgLoader(), // svg-loader plugin

		// rollup-plugin command (will be fired after build)
		rollupCommand(`node ./src/core/runAfterBuild.js`),
	],
	resolve: {
		alias: {
		  '@assets': path.resolve(__dirname, './public/assets'),
		},
	  },
});
