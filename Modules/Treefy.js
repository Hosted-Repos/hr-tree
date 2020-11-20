// Loading modules
let Errors = require("../Utilities/Errors.js");
let path = require('path');
let fs = require('fs');
var log;
var files = 0;
var folders = 0;

//Treefy Function
module.exports = function () {

    console.log("Welcome to Treefy");
    let MetaData = fs.readFileSync(path.join(arguments[0], "Metadata.json"));
    let log = JSON.parse(MetaData);
    treefy(arguments[0], arguments[1], log);
    console.log(`Total ${files} files copied from source to the destination.`);
    console.log(`Total ${folders} folders are generated at the destination.`);
    console.log(`Process Completed.`);
    
}

function treefy(src, dest, log) {
    if (log.isFile) {
        fs.copyFile(path.join(src, log.newName), path.join(dest, log.name), (err) => {
            if (err)
                throw err;
        });
        files = files+1;
    }
    else {
        folders = folders + 1;
        var dir = log.name;     
        dir = path.join(dest, dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        for (let i = 0; i < log.children.length; i++) {
            treefy(src, dir, log.children[i]);
        }

    }
}