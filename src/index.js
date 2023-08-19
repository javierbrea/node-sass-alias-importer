const path = require("path");

const IMPORTS_PATH_SEP = "/";

const aliasImporter = (aliases, options = {}) => {
  const aliasesDetails = Object.keys(aliases).map((alias) => ({
    alias,
    path: path.resolve(options.root || process.cwd(), aliases[alias]),
  }));
  return (url, prev, done) => {
    const isSyncMode = typeof done !== "function";
    let result = {
      file: url,
    };

    const aliasFound = aliasesDetails.find((aliasDetails) => {
      return url.split(IMPORTS_PATH_SEP)[0] === aliasDetails.alias;
    });

    if (aliasFound) {
      result = {
        file: path.normalize(
          url.replace(
            aliasFound.alias,
            path.relative(prev, aliasFound.path).replace(`..${path.sep}`, ""),
          ),
        ),
      };
    }

    if (isSyncMode) {
      return result;
    }
    done(result);
  };
};

module.exports = aliasImporter;
