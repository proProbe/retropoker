const fileSystem = require("fs-extra");
const path = require("path");

// clean de dist folder
// fileSystem.emptyDirSync(path.join(__dirname, "../build"));
fileSystem.emptyDirSync(path.join(__dirname, "../dist"));

// require("./generate_manifest");
