const path = require("path");
const test = require("mocha-sinon-chai");

const index = require("../src/index");

test.describe("index", () => {
  test.it("should export a function", () => {
    test.expect(typeof index).to.equal("function");
  });

  test.it("should resolve alias when founds a file url with first path equal to alias", () => {
    const importer = index({ themes: "./src/styles/themes" });
    return new Promise(resolve => {
      importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"), resolve);
    }).then(result => {
      return test.expect(result).to.deep.equal({
        file: "../../styles/themes/foo-theme/index"
      });
    });
  });

  test.it("should resolve alias when founds a file url equal to alias", () => {
    const importer = index({ variables: "./src/styles/variables/index" });
    return new Promise(resolve => {
      importer("variables", path.resolve("src/components/foo/foo.scss"), resolve);
    }).then(result => {
      return test.expect(result).to.deep.equal({
        file: "../../styles/variables/index"
      });
    });
  });

  test.it("should not resolve alias when founds a file url with a path starting by alias", () => {
    const importer = index({ variables: "./src/styles/variables/index" });
    return new Promise(resolve => {
      importer("variables-real-path/index", path.resolve("src/components/foo/foo.scss"), resolve);
    }).then(result => {
      return test.expect(result).to.deep.equal({
        file: "variables-real-path/index"
      });
    });
  });
});
