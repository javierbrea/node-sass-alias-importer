const path = require("path");

const IMPORTS_PATH_SEP = "/";

const aliasImporter = (aliases, options = {}) => {
  const aliasesDetails = Object.keys(aliases).map((alias) => ({
    alias,
    path: path.resolve(options.root || process.cwd(), aliases[alias]),
  }));
  return (url, prev, done) => {
    const isAsyncMode = typeof done === 'function';
    let result = null;
    aliasesDetails.forEach((aliasDetails) => {
      if (!result && url.split(IMPORTS_PATH_SEP)[0] === aliasDetails.alias) {
        result = {
          file: path.normalize(
              url.replace(
                  aliasDetails.alias,
                  path.relative(prev, aliasDetails.path).replace(`..${path.sep}`, "")
              )
          ),
        };
      }
    });
    if (!result) {
      result = {
        file: url,
      };
    }
    if (isAsyncMode) {
      done(result);
    } else {
      return result;
    }
  };
};

module.exports = aliasImporter;
