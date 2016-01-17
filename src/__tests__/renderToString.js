import test from "ava"

import Metalsmith from "metalsmith"
import react from "../index"

test.cb("renderToString", (t) => {
  new Metalsmith(__dirname)
    .destination("build/renderToString")
    .use(
      react({
        pattern: "**/*.md",
        templatesPath: "modules",
        reactRender: "renderToString",
      })
    )
    .use(files => {
      t.ok(
        files["2.md"].contents.toString().indexOf(`<html data-reactid="`) > -1,
        "should works with React.renderToString()"
      )

      t.end()
    })
    .build(err => {
      if (err) {
        throw err
      }
    })
})
