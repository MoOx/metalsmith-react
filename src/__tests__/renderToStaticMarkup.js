import test from "ava"

import Metalsmith from "metalsmith"
import react from "../index"

test.cb("renderToStaticMarkup", (t) => {
  new Metalsmith(__dirname)
    .destination("build/renderToStaticMarkup")
    .use(
      react({
        pattern: "**/*.md",
        templatesPath: "modules",
        data: {
          a: "A",
        },
      })
    )
    .use(files => {
      t.is(
        files["1.md"].contents.toString(),
        "<html><body><a>A</a><div># test\n</div></body></html>",
        "should wrap file content with react template"
      )
      t.is(
        files["2.md"].contents.toString(),
        "<html><body><div>test 2\n</div></body></html>",
        "should wrap file content with another react template"
      )
      t.is(
        files["3.txt"].contents.toString(),
        "text\n",
        "should not wrap file content when doesn't match pattern"
      )
      t.is(
        files["4.md"].contents.toString(),
        "<div>Hello<div>Classic Test\n</div></div>",
        "should wrap file content with es5 react template"
      )
      t.end()
    })
    .build(err => {
      if (err) {
        throw err
      }
    })
})
