# metalsmith-react [![Travis Build Status](https://travis-ci.org/MoOx/metalsmith-react.svg)](https://travis-ci.org/MoOx/metalsmith-react)

> Metalsmith plugin to use React as a template engine

---

## _Is it possible to use React on the front-end to be able to use stuff like `onClick`?_

That's a really good question.
This can be probably done with metalsmith, but this tool is not the right choice.
Not front-end oriented enough.

**Because of this frustration, I created [Phenomic](https://phenomic.io/),
which is a modern static website generator based on React and Webpack.**

_This project is under active development (unlike metalsmith), so give it a try!_

---

Note that this module doesn't handle jsx.
You might use [babel(-node)](http://babeljs.io/) to handle that.

## Install

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
      },
      reactRender: "renderToStaticMarkup" //you can use "renderToString" if you want
    })
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

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
