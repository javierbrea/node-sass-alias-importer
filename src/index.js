const path = require("path");

const IMPORTS_PATH_SEP = "/";

const aliasImporter = (aliases, options = {}) => {
  const aliasesDetails = Object.keys(aliases).map((alias) => ({
    alias,
    path: path.resolve(options.root || process.cwd(), aliases[alias]),
  }));
  return (url, prev, done) => {
    let aliasFound = false;
    aliasesDetails.forEach((aliasDetails) => {
      if (!aliasFound && url.split(IMPORTS_PATH_SEP)[0] === aliasDetails.alias) {
        aliasFound = true;
        done({
          file: url.replace(
            aliasDetails.alias,
            path.relative(prev, aliasDetails.path).replace(`..${path.sep}`, "")
          ),
        });
      }
    });
    if (!aliasFound) {
      done({
        file: url,
      });
    }
  };
};

module.exports = aliasImporter;
