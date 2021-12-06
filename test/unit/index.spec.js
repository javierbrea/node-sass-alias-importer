const path = require("path");

const index = require("../../src/index");

describe("index", () => {
  describe("export", () => {
    it("should export a function", () => {
      expect(typeof index).toEqual("function");
    });
  });

  describe("with default options", () => {
    it("should resolve alias when founds a file url with first path equal to alias", () => {
      const importer = index({ themes: "./src/styles/themes" });
      return new Promise((resolve) => {
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return expect(result).toEqual({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });

    it("should resolve alias when founds a file url equal to alias", () => {
      const importer = index({ variables: "./src/styles/variables/index" });
      return new Promise((resolve) => {
        importer("variables", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return expect(result).toEqual({
          file: path.join("..", "..", "styles", "variables", "index"),
        });
      });
    });

    it("should not resolve alias when founds a file url with a path name only starting by alias", () => {
      const importer = index({ variables: "./src/styles/variables/index" });
      return new Promise((resolve) => {
        importer(
          "variables-real-path/index",
          path.resolve("src/components/foo/foo.scss"),
          resolve
        );
      }).then((result) => {
        return expect(result).toEqual({
          file: "variables-real-path/index",
        });
      });
    });

    it("should accept aliases with absolute paths", () => {
      const importer = index({ themes: path.resolve(__dirname, "..", "src", "styles", "themes") });
      return new Promise((resolve) => {
        importer(
          "themes/foo-theme/index",
          path.resolve(__dirname, "..", "src", "components", "foo", "foo.scss"),
          resolve
        );
      }).then((result) => {
        return expect(result).toEqual({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });
  });

  describe("When no done callback is provided because node-sass is in sync render mode", () => {
    it("should return alias when founds a file url with first path equal to alias", () => {
      const importer = index({ themes: "./src/styles/themes" });
      expect(
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"))
      ).toEqual({
        file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
      });
    });

    it("should resolve alias when founds a file url equal to alias", () => {
      const importer = index({ variables: "./src/styles/variables/index" });
      expect(importer("variables", path.resolve("src/components/foo/foo.scss"))).toEqual({
        file: path.join("..", "..", "styles", "variables", "index"),
      });
    });

    it("should not resolve alias when founds a file url with a path name only starting by alias", () => {
      const importer = index({ variables: "./src/styles/variables/index" });
      expect(
        importer("variables-real-path/index", path.resolve("src/components/foo/foo.scss"))
      ).toEqual({
        file: "variables-real-path/index",
      });
    });

    it("should accept aliases with absolute paths", () => {
      const importer = index({ themes: path.resolve(__dirname, "..", "src", "styles", "themes") });
      expect(
        importer(
          "themes/foo-theme/index",
          path.resolve(__dirname, "..", "src", "components", "foo", "foo.scss")
        )
      ).toEqual({
        file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
      });
    });
  });

  describe("when using root option", () => {
    it("should prepend the root to resolved alias path", () => {
      const importer = index({ themes: "themes" }, { root: "./src/styles" });
      return new Promise((resolve) => {
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"), resolve);
      }).then((result) => {
        return expect(result).toEqual({
          file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
        });
      });
    });

    it("should prepend the root to resolved alias path when no done callback is provided", () => {
      const importer = index({ themes: "themes" }, { root: "./src/styles" });
      expect(
        importer("themes/foo-theme/index", path.resolve("src/components/foo/foo.scss"))
      ).toEqual({
        file: path.join("..", "..", "styles", "themes", "foo-theme", "index"),
      });
    });
  });
});
