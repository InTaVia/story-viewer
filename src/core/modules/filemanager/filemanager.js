

//// imports
import core from "./../../core.js";
import { reactive } from 'vue';
import _ from 'lodash';
import $ from 'jquery';

export default {


    /**
     * init module
     */
    init(){

        //// init state & settings
        window.fg.state.m.Filemanager = {
            settings: {
            }
        };
        // map global module-state and module-settings directly to module-scope
        this.state = window.fg.state.m.Filemanager;
        this.settings = window.fg.state.m.Filemanager.settings;
        //// Module globals
        this.temp = {};

    },














    ////////////////////////////////////////////////////
    // get_all_files_on_device(callback)
    // DESCRIPTION: get all_files_on_device (a list with all existing files on device)
    // NOTE: this will read "all_files_on_device.json" from documents (or create it on first start)
    ////////////////////////////////////////////////////
    get_all_files_on_device: function(callback) {

        // define callback
        callback = callback || function(){};

        // CASE - web-app -> just return
        if (fg.state.device.isWebapp) {callback();return;}

        // get "all_files_on_device.json" from documents
        fg.m.Filemanager.cordova_read_file('all_files_on_device.json',
        
            // normal CASE - "all_files_on_device.json" exists
            function(result) {
                // CASE - all_files_on_device.json is valid
                try {
                    // save file-list
                    fgCordova.all_files_on_device = JSON.parse(result);
                    // write all_files_on_device_was_written
                    localStorage.all_files_on_device_was_written = "1";
                    // make callback
                    callback();
                } 
                // CASE - all_files_on_device.json is NOT valid
                catch(e) {  
                    // "repair_all_files_on_device()" 
                    fg.m.Filemanager.repair_all_files_on_device();
                }

            },


            // "first-start" CASE - "all_files_on_device.json" DOES NOT exist -> write it
            function() {
                
                // SPECIAL CASE - this is NOT first start and all_files_on_device.json is not available --> repair
                if (localStorage.all_files_on_device_was_written == "1") {
                    fg.m.Filemanager.repair_all_files_on_device();
                    return;
                }

                // get ipa_www_files.json from ipa-www (this is a list of all content-files that are deployed in the ipa-www-directory - /fluxguide_content directory)
                $.ajax({
                    url: fgCordova.ipa_www_path + "fluxguide_content/ipa_www_files.json",
                    dataType: 'json',
                    
                    // CASE 1 - ipa_www_files.json does exist
                    success: function(response) {
                        // content-files
                        var content_file_list = response;
                        // app-files from ipa-www
                        var app_file_list = [];
                        // add "ipa"-attribute to each of these app-files
                        fgCordova.app_files_inside_ipa_www.forEach(file => {
                            // add "ipa"-attribute to all these file-list-entry
                            var app_file_list_entry = file;
                            app_file_list_entry.ipa = "1";
                            app_file_list.push(app_file_list_entry);
                        }); 
                        // merge files from ipa_www_files.json and app_files.json
                        var file_list = app_file_list.concat(content_file_list);
                        // write "all_files_on_device.json"
                        fg.m.Filemanager.cordova_write_file('all_files_on_device.json', JSON.stringify(file_list),
                            // write-file SUCCESS
                            function() {
                                // define all_files_on_device
                                fgCordova.all_files_on_device = file_list;
                                // set "all_files_on_device_was_written"
                                localStorage.all_files_on_device_was_written = "1";
                                // make callback
                                callback();
                            },
                            // (very special) FILE-ERROR -> prevent app-start
                            function() {fgCordova.fail_and_restart("all_files_on_device.json could not be written (in get_all_files_on_device())"); }
                        );
                    },

                    // TODO: Remove this?? (ipa_www_files.json does always exist)
                    // CASE 2 - ipa_www_files.json does NOT exist
                    error: function() {
                        // define empty file-list (just a dummy item)
                        let fileList = [{"system":"1","ipa":"1","size":1000,"moddate":123456789,"url":"this_list_is_empty.txt"}];
                        // fire warning
                        console.log("Warning from get_all_files_on_device(): ipa_www_files.json does NOT exist in ipa-www");
                        // write (empty) "all_files_on_device.json"
                        fg.m.Filemanager.cordova_write_file('all_files_on_device.json', JSON.stringify(fileList),
                            // write-file SUCCESS
                            function() {
                                // set empty file-list
                                fgCordova.all_files_on_device = fileList;
                                // set "all_files_on_device_was_written"
                                localStorage.all_files_on_device_was_written = "1";
                                // make callback
                                callback();
                            },
                            // FILE-ERROR -> prevent app-start
                            function() {fgCordova.fail_and_restart("all_files_on_device.json could not be written (in get_all_files_on_device())"); }
                        );
                    }
                });
            }

        );

    },








    ////////////////////////////////////////////////////
    // cordova_write_file(filename, content, success_callback, error_callback)
    // DESCRIPTION: write file into filesystem
    ////////////////////////////////////////////////////
    cordova_write_file: function(filename, content, success_callback, error_callback) {
        
        // check given parameters
        if(filename == undefined) return;
        if(content == undefined) return;
        
        // check if our directoryEntry is ready
        if (fgCordova.device_directoryEntry == undefined) return;
        
        // STEP 1 - get file (create if not exist)
        fgCordova.device_directoryEntry.getFile(filename, {create: true}, function(file) {
            // STEP 2 - write into file
            file.createWriter(
                function(fileWriter) {
                    var blob = new Blob([content], { type:'text/plain' });
                    fileWriter.write(blob);
                    if (success_callback) success_callback();
                },
                function(err) { 
                    if (error_callback) error_callback(err);
                });
        });
        
    },
    
    
    
    ////////////////////////////////////////////////////
    // cordova_read_file(filename, success_callback, error_callback)
    // DESCRIPTION: read file from documents-folder
    ////////////////////////////////////////////////////
    cordova_read_file: function(filename, success_callback, error_callback) {
        
        // check given parameters
        if(filename == undefined) return;
        success_callback = success_callback || function(result){console.log(result);};
        error_callback = error_callback || function(){console.log('File does not exist.');};
        
        // get file
        fgCordova.device_directoryEntry.getFile(filename, {create: false},
            function(file) {
                file.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function(e) {if(success_callback) success_callback(this.result);}
                    reader.readAsText(file);
                });
            },
            function(err){
                if(error_callback) error_callback(err);
            }
        );
        
    },
    


    
    ////////////////////////////////////////////////////
    // cordova_copy_file(filename_from, filename_to, success_callback, error_callback)
    // DESCRIPTION: copy file
    ////////////////////////////////////////////////////
    cordova_copy_file: function(filename_from, filename_to, success_callback, error_callback) {
        
        // if web-app --> exit
        if (fg.state.device.isCordova == false) return;

        var success_callback = success_callback || function() {};
        var error_callback = error_callback || function() {console.log('Error in cordova_copy_file!!!')};

        // first delete (existing) file
        fg.m.Filemanager.cordova_delete_files([filename_to], function(){
            // get file
            fgCordova.device_directoryEntry.getFile(filename_from, {create: false},
                // readfile success
                function(fileEntry) {
                    fileEntry.copyTo(fgCordova.device_directoryEntry, filename_to,success_callback,error_callback);
                },
                // readfile error
                error_callback
            );
        });


        
    },    
    


    ////////////////////////////////////////////////////
    // cordova_delete_files(files, callback)
    // DESCRIPTION: delete given files from device
    // @param files is an array of urls (like ["public/content/xxx.jpg", "public/content/yyy.jpg"])
    // Usage: fg.m.Filemanager.cordova_delete_files(["path/to/file/one.jpg", "path/to/file/two.mp3"])
    ////////////////////////////////////////////////////
    cordova_delete_files: function(files, callback) {  

        // validate
        if (_.size(files) == 0 || _.isArray(files) == false) return;
        callback = callback || function(){};

        // if web-app --> exit
        if (fg.state.device.isCordova == false) { callback(); return; }

        // start deleting files
        fg.m.Filemanager.cordova_delete_files_helpfunction(files, 0, callback);

    },

    
    ////////////////////////////////////////////////////
    // cordova_delete_files_helpfunction(files, error_callback)
    // DESCRIPTION: delete given file from device
    ////////////////////////////////////////////////////
    cordova_delete_files_helpfunction: function(files, delete_file_index, custom_callback) {

            // define callback
            var callback = function(){
                // write all_file_on_device.json on device         
                fg.m.Filemanager.cordova_write_file('all_files_on_device.json', JSON.stringify(fgCordova.all_files_on_device));   
                // start custom callback
                custom_callback();
            };

            // define file to delete
            var file = files[delete_file_index];

            // get file
            fgCordova.device_directoryEntry.getFile(file, {create: false},
                // readfile success
                function(fileEntry) 
                {
                    fileEntry.remove
                    (
                        // file has been deleted
                        function(){
                            // file-counter
                            delete_file_index++;

                            // remove from "files-on-device-list"
                            if (fgCordova.all_files_on_device) _.remove(fgCordova.all_files_on_device, {url: file});
                            // all files has been deleted
                            if(delete_file_index == files.length) callback();
                            // goto next file
                            else fg.m.Filemanager.cordova_delete_files_helpfunction(files, delete_file_index, callback);
                        },
                        // error while deleting file
                        function(){
                            // file-counter
                            delete_file_index++;

                            // all files has been deleted
                            if(delete_file_index == files.length) callback();
                            // goto next file
                            else fg.m.Filemanager.cordova_delete_files_helpfunction(files, delete_file_index, callback);
                        },
                        // files does not exist
                        function(){
                            // file-counter
                            delete_file_index++;

                            // all files has been deleted
                            if(delete_file_index == files.length) callback();
                            // goto next file
                            else fg.m.Filemanager.cordova_delete_files_helpfunction(files, delete_file_index, callback);
                        }
                    );

                },

                // readfile error
                function(){
                    // file-counter
                    delete_file_index++;
                    // all files has been deleted
                    if(delete_file_index == files.length) callback();
                    // goto next file
                    else fg.m.Filemanager.cordova_delete_files_helpfunction(files, delete_file_index, callback);
                }
            );

    },




    
    ////////////////////////////////////////////////////
    // file_exists(filename, success, error)
    // GENERIC FUNCTION: Check if file exists in device-memory
    ////////////////////////////////////////////////////
    file_exists: function(filename, success, error) {
        // if web-app --> exit
        if (fg.state.device.isCordova == false) return;
        success = success || function(){console.log('file does exist')};
        error = error || function(){console.log('file does NOT exist')};
        // check if file exists on device
        fgCordova.device_directoryEntry.getFile(filename, null, success, error);
    },
    
    


    ////////////////////////////////////////////////////
    // directory_exists(dirname)
    // GENERIC FUNCTION: Check if directory exists in device-memory
    ////////////////////////////////////////////////////
    directory_exists: function(dirname, success, error) {
        // if web-app --> exit
        if (fg.state.device.isCordova == false) return;
        success = success || function() { console.log('directory does exist') };
        error = error || function() { console.log('directory does NOT exist') };
        // check if file exists on device
        fgCordova.device_directoryEntry.getDirectory(dirname, null, success, error);
    },   

    
    ////////////////////////////////////////////////////
    // create_directory(path, success)
    // DESCRIPTION: create nested directories (if they haven't been created before)
    // NOTE: (Adapted from http://stackoverflow.com/questions/10961000/nested-directory-creator-phonegap)
    ////////////////////////////////////////////////////
    create_directory: function(path, success) {
        
        // if web-app --> exit
        if (fg.state.device.isCordova == false) return;

        // get path segments
        let path_segments = path.split("/").filter(String);
        let paths_to_create = [];
        _.each(path_segments, function(value, index) {
            var this_path = path_segments.slice(0, index+1).join("/");
            paths_to_create.push(this_path);
        });

        // createDir function (will call subsequent paths)
        let createDir = function(index) {
            fgCordova.device_directoryEntry.getDirectory(paths_to_create[index], 
                {
                    create : true,
                    exclusive : false
                }, 
                function(entry) {
                    if(index < paths_to_create.length-1) {
                        // move to next directory
                        index++;
                        createDir(index);
                    }
                    else {
                        // done -> success
                        success(entry); 
                    }
                }, 
                function(error) { fg.m.Filemanager.fail(error, 'Error in create_directory(): Directory could not be created: ' + paths_to_create[index]); });
        };

        // start with first directory
        if(paths_to_create.length > 0) createDir(0);            
    }, 





























    // FILEMANAGER - REPAIR MODE



    ////////////////////////////////////////////////////
    // repair_all_files_on_device()
    // DESCRIPTION: will recreate all_files_on_device.json (when json-file is for some reason corrupt)
    ////////////////////////////////////////////////////
    repair_all_files_on_device: function() {

        // get active-files
        $.ajax({
            url: fg.state.baseUrl + 'fluxguide_api/get_active_files/' +  + '?t=' + _.now(),
            type: 'POST',
            dataType: 'json',
            // CASE - online
            success: function(response) {
                // get files-list from ajax-response
                var all_files = response.data;
                // init all_files_on_device
                fgCordova.all_files_on_device = [];
                // save file-list-data globaly (will be used later)
                fg.m.Filemanager.repairmode_current_index = 0;
                fg.m.Filemanager.repairmode_all_files = all_files;
                // start repairing
                fg.m.Filemanager.repair_next_file();
            },
            // CASE - offline
            error: function() { 
                // fail
                fgCordova.fail_and_restart("repair-mode only works when device is ONLINE --> please activate WIFI and restart.");
                // TODO -> this could also be done offline when manually traversing through the documents-files on device
                // do it here....
            }
        });
    
    
    },
        


    ////////////////////////////////////////////////////
    // repair_next_file()
    // DESCRIPTION: helpfunction for repair_all_files_on_device()
    ////////////////////////////////////////////////////
    repair_next_file: function() {       

        // show output
        var output = '<h3>Repairing all_files_on_device.json<h3> ' + fg.m.Filemanager.repairmode_current_index + ' / ' + fg.m.Filemanager.repairmode_all_files.length;
        $('body').html(output);

        // CASE - repair FINISHED -> write all_files_on_device.json --> and restart app
        if (fg.m.Filemanager.repairmode_current_index >= (_.size(fg.m.Filemanager.repairmode_all_files))) {
            
            // write all_file_on_device.json on device         
            fg.m.Filemanager.cordova_write_file('all_files_on_device.json', JSON.stringify(fgCordova.all_files_on_device), 
                // all_files_on_device.json was written -> start repair next file
                function(){
                    fgCordova.fail_and_restart("Repair SUCCESS --> app will restart");
                },
                // SPECIAL ERROR-CASE - write all_files_on_device.json does not work --> restart
                function(){
                    fgCordova.fail_and_restart("all_files_on_device.json could NOT be written in repair-mode --> will try again on next app-start. Please wait...");
                }
            );   
            
            // exit
            return;
        }

        // get file
        var file = fg.m.Filemanager.repairmode_all_files[fg.m.Filemanager.repairmode_current_index];

        // CHECK if file exist on device
        fg.m.Filemanager.file_exists(file.url, 
            // CASE - file exists -> write file into all_files_on_device.json
            function(){
                //// update fgCordova.all_files_on_device
                // remove this file from existing-file-list (if it exists)
                _.remove(fgCordova.all_files_on_device, function(file_record) { return file_record.url == file.url; });
                // delete "ipawww"-tag from this file (if exists)
                delete file.ipa;
                // add this file to file-list
                fgCordova.all_files_on_device.push(file);
                // repair next file
                fg.m.Filemanager.repairmode_current_index++;
                fg.m.Filemanager.repair_next_file();
            },
            // CASE - file DOES NOT exist -> check next file
            function(){
                // repair next file
                fg.m.Filemanager.repairmode_current_index++;
                fg.m.Filemanager.repair_next_file();
            }
        );
    

    },












}