


/* Load core-modules */
import Device from './device/device.js'; 
import Filemanager from './filemanager/filemanager.js'; 
import Downloader from './downloader/downloader.js'; 
import PackageDownloader from './downloader/package-downloader.js'; 

/////////////////////////////////////////////////
// init_core_modules()
// DESCRIPTION: init all core modules
/////////////////////////////////////////////////
export default function init_core_modules() {

    // init modules scope
    fg.m = {};

    // define modules
    fg.m.Device = Device;
    fg.m.Filemanager = Filemanager;
    fg.m.Downloader = {...Downloader, ...PackageDownloader};


    // init modules
    fg.m.Device.init();
    fg.m.Filemanager.init();
    fg.m.Downloader.init();

    

}
