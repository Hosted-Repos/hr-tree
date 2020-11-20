// Retrieving inputs and modules
let input = process.argv;
let View = require("./Modules/View.js");
let Treefy = require("./Modules/Treefy.js");
let Untreefy = require("./Modules/Untreefy.js");
let Errors = require("./Utilities/Errors.js");


//Main Switch Case
switch (input[2]) {
    case 'view':
        View(input[3], input[4]);
        break;
    case 'untreefy':
        Untreefy(input[3], input[4]);
        break;
    case 'treefy':
        Treefy(input[3], input[4]);
        break;
    default:
        Errors.InvalidArgumentsError();
        break;
}
