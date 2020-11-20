// Loading modules
let Errors = require("../Utilities/Errors.js");
let path = require('path');
let fs = require('fs');


//View Function
module.exports = function () {
    console.log("Handling View Functionality");
    switch (arguments[1]) {
        case '-l':
            console.log("Loading Source Folder as List...");
            ViewAsList(arguments[0]);
            break;
        case '-t':
            console.log("Loading Source Folder as Tree...");
            ViewAsTree(arguments[0] , "");
            break;
        case '-h':
            console.log("Loading Source Folder History...");
            ViewHistory(arguments[0]);
            break;
        default:
            Errors.InvalidArgumentsError();
            break;
    }
}

function ViewAsList(rpath) {
    let stats = fs.lstatSync(rpath)
    if(!stats.isDirectory())
    {
        console.log(rpath + "*");
    }
    else
    {
        console.log(rpath);
        let children = fs.readdirSync(rpath);
        children.forEach(element => {
            let cpath = path.join(rpath, element);
            ViewAsList(cpath)
        });
    }
}


function ViewAsTree(rpath , indent) {
    let stats = fs.lstatSync(rpath)
    if(!stats.isDirectory())
    {
        console.log(indent + ">" + path.parse(rpath).base + "*");
    }
    else
    {
        console.log(indent + path.parse(rpath).base);
        let children = fs.readdirSync(rpath);
        children.forEach(element => {
            let cpath = path.join(rpath, element);
            ViewAsTree(cpath, indent + "----")
        });
    }
}


function ViewHistory() {
}