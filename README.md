# metalsmith-react [![Travis Build Status](https://travis-ci.org/MoOx/metalsmith-react.svg)](https://travis-ci.org/MoOx/metalsmith-react)

> Metalsmith plugin to use React as a template engine

Note that this module doesn't handle jsx.
You might use [babel(-node)](http://babeljs.io/) to handle that.

## Installation

```console
$ npm install metalsmith-react
```

## Usage

```js
import Metalsmith from "metalsmith"
import react from "metalsmith-react"

new Metalsmith("./")
  .use(
    react({
      pattern: "**/*.md",
      templatesPath: "modules", // default to "templates"
      before: "<!doctype html>\n",
      data: {
        some: "data", // you might be able to consume that as props in the template
      }),
      reactRender: "renderToStaticMarkup" //you can use "renderToString" if you want
  )
  .build(err => {if (err) {throw err}})
```

See [__tests__](__tests__) for templates examples

### Options

#### `templatesPath` (default: `"templates"`)

Place to read react templates (class)

#### `defaultTemplate` (default: `"default"`)

Name of the default template file (relative to `templatesPath`)

#### `pattern` (default: `"**/*"`),

Pattern to filter files. Used by [multimatch](https://github.com/sindresorhus/multimatch)

#### `data` (default: `{}`)

Object passed to React component in addition to the file itself.

#### `before` (default: "")

Allows to prepend something before the rendered component (eg: `{before: "<!doctype html>\n"}`)

#### `after` (default: "")

Allows to append something after the rendered component

#### `reactRender` (default: `"renderToStaticMarkup"`)

React render method. You can use `"renderToString"` if you want.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
