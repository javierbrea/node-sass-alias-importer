const test = require("mocha-sinon-chai");

const index = require("../src/index");

test.describe("index", () => {
  test.it("should export a function", () => {
    test.expect(typeof index).to.equal("function");
  });
});
