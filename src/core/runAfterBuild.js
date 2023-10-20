///////////
// FILENAME: runAferBuild.js
// DESCRIPTION: this file will be executed on each vite.js build-process
///////////

// imports
const { hashElement } = require('folder-hash'); // import folder-hash
const fs = require('fs'); // import file-system

//// write app_files.json

// init app_files.json
let app_info = {
	app_files_hash: '', // total hash-value of /asset folder (will be used for change-detection in cordova-app)
	app_files: [], // system-file-list (will be used for download in cordova-app)
    app_build_timestamp: new Date(),
	// js_file_vendor: {},          	// name
	// js_file_index: {},
	// css_file: {}
};

// get hash-list (of assets-files)
hashElement(
	'./dist/assets',

	{
		folders: { exclude: ['.*'] }, // hash-option - exclude subfolders
		files: { exclude: ['.*'] }, // hash-option - exclude special files
	}
)
	.then((hash) => {

		// get files-list
		app_info.app_files = getFiles(hash);

		// save "system-files"-hash
		app_info.app_files_hash = hash.hash;

		// write JSON-file
		let data = JSON.stringify(app_info, null, 2);
		fs.writeFile('./dist/app_files.json', data, (err) => {
			if (err) {
				throw err;
			}
		});

		// create htaccess-file (for)
		data = 'Header set Access-Control-Allow-Origin "*"';
		fs.writeFile('./dist/.htaccess', data, (err) => {
			if (err) {
				throw err;
			}
		});
	})
	.catch((error) => {
		return console.error('hashing failed:', error);
	});







/**
 * getFiles() - This recursive function will get file-entries
 * @param  {} fileEntries
 * @param  {} directoryName=""
 */
function getFiles(fileEntries, directoryName="") {
	
	// init output
	let output = [];
	
	fileEntries.children.forEach((fileEntry) => {

		// CASE - this entry is a directory
		if (fileEntry.children) {
			let folderFileList = getFiles(fileEntry, directoryName + '/' + fileEntry.name);
			output = output.concat(folderFileList);
		}

		// CASE - this entry is a file
		else {
			//// SPECIAL - duplicate index.js, style.css files (and exclude form file-list) - these files will be (hardcoded) downloaded from cordova-app
			if (fileEntry.name.startsWith('index') && fileEntry.name.endsWith('.js')) {
				fs.copyFile('./dist/assets/' + fileEntry.name, './dist/assets/index.js', (err) => {});
				return;
			}
			if (fileEntry.name.startsWith('style') && fileEntry.name.endsWith('.css')) {
				fs.copyFile('./dist/assets/' + fileEntry.name, './dist/assets/style.css', (err) => {});
				return;
			}

			// get file-size
			let stats = fs.statSync('./dist/assets' + directoryName + '/' + fileEntry.name)
			let fileSizeInBytes = stats.size;
			//// create file-list-entry
			let newFileListEntry = {};
			// url (filename-only)
			newFileListEntry.url = 'assets' + directoryName + '/' + fileEntry.name;
			// moddate/hash (will be used for change-detection)
			newFileListEntry.moddate = fileEntry.hash;
			// "is_app_file"-flag (in comparison to "content_files")
			newFileListEntry.is_app_file = "1";
			// file-size (in bytes)
			newFileListEntry.size = fileSizeInBytes;
			// push to output
			output.push(newFileListEntry);
		}

	});

	// return file-list
	return output;
} 
