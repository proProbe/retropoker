const fileSystem = require("fs-extra");
const path = require("path");

// clean de dist folder
module.exports = {
  clearDist: () => {
    fileSystem.emptyDirSync(path.join(__dirname, "../dist"));
  }
}
