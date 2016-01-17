import test from "ava"

import Metalsmith from "metalsmith"
import react from "../index"

test.cb("before-after", (t) => {
  new Metalsmith(__dirname)
    .destination("build/before-after")
    .use(
      react({
        pattern: "**/*.md",
        templatesPath: "modules",
        before: "<!doctype html>\n",
        after: "<!--test-->\n",
      })
    )
    .use(files => {
      t.ok(
        files["1.md"].contents.toString().indexOf(`<!doctype html>`) === 0,
        "should allow to prepend content before"
      )
      t.ok(
        files["1.md"].contents.toString().indexOf(`</html><!--test-->`) > -1,
        "should allow to append content before"
      )

      t.end()
    })
    .build(err => {
      if (err) {
        throw err
      }
    })
})
