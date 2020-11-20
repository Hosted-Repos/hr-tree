// Loading modules
let Errors = require("../Utilities/Errors.js");
let path = require('path');
let fs = require('fs');
let uuid = require('uuid');
var log = {};
var nf = 0;

//Untreefy Function
module.exports = function () {

    console.log("Welcome to Untreefy");
    log = Untreefy(arguments[0], arguments[1]);
    var myJSON = JSON.stringify(log);
    console.log(`Total ${nf} files copied from source to the destination.`);
    fs.writeFile(path.join(arguments[1], "MetaData.json"), myJSON, 'utf-8', function () { });
    console.log("Process Completed!");

}

function Untreefy(rpath, dest) {
    let stats = fs.lstatSync(rpath)
    if (!stats.isDirectory()) {
        let r = uuid.v4();;
        var dlog = {};
        dlog.name = path.parse(rpath).base;
        dlog.isFile = true;
        dlog.children = children;
        nf = nf + 1;
        var n = dlog.newName = r + path.extname(dlog.name);
        fs.copyFile(rpath, path.join(dest, n), (err) => {
            if (err)
                throw err;
        });
        return dlog;
    }
    else {
        var dlog = {};
        dlog.name = path.parse(rpath).base;
        dlog.isFile = false;
        var children = [];
        let child = fs.readdirSync(rpath);
        var i = 0;
        child.forEach(element => {
            let cpath = path.join(rpath, element);
            children[i] = Untreefy(cpath, dest)
            i++;
        });
        dlog.children = children;
        return dlog;
    }
}