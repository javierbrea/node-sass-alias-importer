const path = require("path");
const test = require("mocha-sinon-chai");

const index = require("../src/index");

test.describe("index", () => {
  describe("export", () => {
    test.it("should export a function", () => {
      test.expect(typeof index).to.equal("function");
    });
  });

  describe("with default options", () => {
    test.it("should resolve alias when founds a file url with first path equal to alias", () => {
      const importer = index({ themes: "./src/styles/themes" });
      return new Promise((resolve) => {
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return test.expect(result).to.deep.equal({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });

    test.it("should resolve alias when founds a file url equal to alias", () => {
      const importer = index({ variables: "./src/styles/variables/index" });
      return new Promise((resolve) => {
        importer("variables", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return test.expect(result).to.deep.equal({
          file: path.join("..", "..", "styles", "variables", "index"),
        });
      });
    });

    test.it(
      "should not resolve alias when founds a file url with a path starting by alias",
      () => {
        const importer = index({ variables: "./src/styles/variables/index" });
        return new Promise((resolve) => {
          importer(
            "variables-real-path/index",
            path.resolve("src/components/foo/foo.scss"),
            resolve
          );
        }).then((result) => {
          return test.expect(result).to.deep.equal({
            file: path.join("variables-real-path", "index"),
          });
        });
      }
    );

    test.it("should accept aliases with absolute paths", () => {
      const importer = index({ themes: path.resolve(__dirname, "..", "src", "styles", "themes") });
      return new Promise((resolve) => {
        importer(
          "themes/foo-theme/index",
          path.resolve(__dirname, "..", "src", "components", "foo", "foo.scss"),
          resolve
        );
      }).then((result) => {
        return test.expect(result).to.deep.equal({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });
  });

  describe("when using root option", () => {
    test.it("should prepend the root to resolved alias path", () => {
      const importer = index({ themes: "themes" }, { root: "./src/styles" });
      return new Promise((resolve) => {
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return test.expect(result).to.deep.equal({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });
  });
});
