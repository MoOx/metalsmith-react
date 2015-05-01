import tape from "tape"

import Metalsmith from "metalsmith"
import react from "../src"

tape("metalsmith-react", test => {

  test.test("renderToStaticMarkup", t => {
    new Metalsmith(__dirname)
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
        t.equal(files["1.md"].contents.toString(), "<html><body><a>A</a><div># test\n</div></body></html>", "should wrap file content with react template")
        t.equal(files["2.md"].contents.toString(), "<html><body><div>test 2\n</div></body></html>", "should wrap file content with another react template")
        t.equal(files["3.txt"].contents.toString(), "text\n", "should not wrap file content when doesn't match pattern")

        t.end()
      })
      .build(err => {if (err) {throw err}})
  })

  test.test("renderToString", t => {
    new Metalsmith(__dirname)
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
      .build(err => {if (err) {throw err}})
  })
})
