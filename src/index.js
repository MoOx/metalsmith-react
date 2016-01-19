import path from "path"

import multimatch from "multimatch"
import { each } from "async"
import React from "react"
import ReactDOMServer from "react-dom/server"

export default (options) => {
  options = {
    templatesPath: "templates",
    defaultTemplate: "default",
    pattern: "**/*",
    data: {},
    before: "",
    after: "",
    reactRender: "renderToStaticMarkup", // or renderToString
    ...options,
  }

  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()

    each(
      multimatch(Object.keys(files), options.pattern),
      (file, cb) => {
        const templatePath = metalsmith.path(path.join(
          options.templatesPath,
          files[file].template || options.defaultTemplate
        ))
        const template = require(templatePath)
        const reactClass = template.default || template
        const Factory = React.createFactory(reactClass)
        const component = new Factory({
          ...metadata,
          ...options.data,
          file: files[file],
        })

        try {
          files[file].contents = new Buffer(
            options.before +
            ReactDOMServer[options.reactRender](component) +
            options.after
          )
        }
        catch (err) {
          cb(err)
        }

        cb()
      },
      done
    )
  }

}
