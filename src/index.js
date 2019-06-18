const path = require("path");

const aliasImporter = (aliases, options = {}) => {
  const absoluteAliases = Object.keys(aliases).reduce((allAliases, alias) => {
    allAliases[alias] = path.resolve(options.root || process.cwd(), aliases[alias]);
    return allAliases;
  }, {});
  return (url, prev, done) => {
    let aliasFound = false;
    Object.keys(aliases).forEach(alias => {
      if (!aliasFound && url.indexOf(alias) === 0) {
        aliasFound = true;
        done({
          file: url.replace(alias, path.relative(prev, absoluteAliases[alias]).replace("../", ""))
        });
      }
    });
    if (!aliasFound) {
      done({
        file: url
      });
    }
  };
};

module.exports = aliasImporter;
