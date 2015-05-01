import path from "path"

import multimatch from "multimatch"
import {each} from "async"
import react from "react"

export default (options) => {
  options = {
    templatesPath: "templates",
    defaultTemplate: "default",
    pattern: "**/*",
    data: {},
    reactRender: "renderToStaticMarkup", // or renderToString
    ...options,
  }

  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()

    each(
      multimatch(Object.keys(files), options.pattern),
      (file, cb) => {
        const template = metalsmith.path(path.join(options.templatesPath, files[file].template || options.defaultTemplate))
        const reactClass = require(template)
        const component = new (react.createFactory(reactClass))({
          ...metadata,
          ...options.data,
          file: files[file],
        })

        try {
          files[file].contents = new Buffer(
            react[options.reactRender](component)
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
