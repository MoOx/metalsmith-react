var React = require("react") // eslint-disable-line

module.exports = function(props) {
  var content = React.createElement("div", { // eslint-disable-line
    dangerouslySetInnerHTML: { __html: props.file.contents },
  })
  return React.createElement("div", null, [ "Hello", content ])
}
