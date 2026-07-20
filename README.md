> [!WARNING]
> **This project is archived and no longer maintained.**
>
> It targets [`node-sass`](https://www.npmjs.com/package/node-sass), which is **deprecated** (LibSass is no longer developed), and it relies on the **legacy Sass importer API**, which has been removed from modern Dart Sass. For new or migrating projects, prefer one of the [modern alternatives below](#alternatives).

# Node Sass Alias Importer

Node sass importer supporting custom alias for directories or specific files.

## Install

```bash
npm i --save-dev node-sass-alias-importer
```

## Usage

Define aliases for directories or specific files in `sass` imports as it is done in `javascript` using the [babel-plugin-module-resolver package](https://www.npmjs.com/package/babel-plugin-module-resolver).

```js
const sass = require("node-sass");
const aliasImporter = require("node-sass-alias-importer");

sass.render({
  file: "./src/components/foo/foo.scss",
  importer: [
    aliasImporter({
      themes: "./src/styles/themes",
      variables: "./src/styles/variables/index"
    })
  ]
});
```

Now you can use aliases for importing specific files, or as base paths in your `import` statements:

```
// file: src/components/foo/foo.scss

@import "themes/foo-theme/index";
// Resolved as "../../styles/themes/foo-theme/index"

@import "variables";
// Resolved as "../../styles/variables/index"
```

## Options

`aliasImporter(aliases [,options])`
* Arguments
	* aliases - _`<Object>`_ Object containing aliases as keys, relative or absolute paths as values.
	* options - _`<Object>`_
		* root - _`<String>`_ Base path for all defined aliases. Default `process.cwd()`

## Examples

### Usage with Rollup

```js
const sassPlugin = require("rollup-plugin-sass");
const sass = require("node-sass");
const aliasImporter = require("node-sass-alias-importer");

module.exports = {
  input: "src/index.js",
  output: {
    file: "dist/index.js"
  },
  plugins: [
    sassPlugin({
      insert: true,
      runtime: sass,
      options: {
        importer: aliasImporter(
          {
            themes: "themes",
            variables: "variables/index"
          },
          {
            root: "./src/styles"
          }
        )
      }
    })
  ]
};
```

### Usage with Webpack

```js
const aliasImporter = require("node-sass-alias-importer");

module.exports = () => ({
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              importer: aliasImporter({
                variables: "./src/styles/variables/index"
              })
            }
          }
        ],
        include: path.resolve(__dirname, "src")
      }
    ]
  }
});
```

## Alternatives

### Dart Sass

Migrate to [Dart Sass](https://sass-lang.com/dart-sass/) (`sass` or `sass-embedded`) — the reference Sass implementation that replaces the deprecated `node-sass`.

### Sass load paths

[Sass load paths](https://sass-lang.com/documentation/cli/dart-sass/#load-path) — pass `loadPaths` to the compiler (or `--load-path` on the CLI) so bare import prefixes resolve to your style directories. The built-in equivalent of directory aliases.

### Bundler-level aliases

Resolve aliases at the bundler instead of in Sass: Vite [`resolve.alias`](https://vite.dev/config/shared-options.html#resolve-alias), Webpack [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias), esbuild, etc.

```js
// webpack.config.js

module.exports = {
  //...
  resolve: {
    alias: {
      themes: path.resolve(__dirname, "src/styles/themes"),
      variables: path.resolve(__dirname, "src/styles/variables/index")
    },
  },
};

```

### `pkg:` importer / `NodePackageImporter`

The [`pkg:` importer / `NodePackageImporter`](https://sass-lang.com/documentation/at-rules/use/#loading-a-module-from-a-package) is Dart Sass's built-in importer for resolving stylesheets shipped inside npm packages.

### Custom modern importers

For programmatic alias resolution, implement a [`FileImporter`](https://sass-lang.com/documentation/js-api/interfaces/fileimporter/) with the modern `compile` / `compileAsync` JS API.

## License

MIT, see [LICENSE](./LICENSE) for details.

[coveralls-image]: https://coveralls.io/repos/github/javierbrea/node-sass-alias-importer/badge.svg
[coveralls-url]: https://coveralls.io/github/javierbrea/node-sass-alias-importer
[build-image]: https://github.com/javierbrea/node-sass-alias-importer/workflows/build/badge.svg?branch=master
[build-url]: https://github.com/javierbrea/node-sass-alias-importer/actions?query=workflow%3Abuild+branch%3Amaster
[last-commit-image]: https://img.shields.io/github/last-commit/javierbrea/node-sass-alias-importer.svg
[last-commit-url]: https://github.com/javierbrea/node-sass-alias-importer/commits
[license-image]: https://img.shields.io/npm/l/node-sass-alias-importer.svg
[license-url]: https://github.com/javierbrea/node-sass-alias-importer/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/node-sass-alias-importer.svg
[npm-downloads-url]: https://www.npmjs.com/package/node-sass-alias-importer
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=javierbrea_node-sass-alias-importer&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=javierbrea_node-sass-alias-importer
[release-image]: https://img.shields.io/github/release-date/javierbrea/node-sass-alias-importer.svg
[release-url]: https://github.com/javierbrea/node-sass-alias-importer/releases
