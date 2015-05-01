import React, {Component, PropTypes} from "react"

export default class Template extends Component {

  static displayName = "Template"

  static propTypes = {
    file: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    file: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      file: this.props.file,
    }
  }

  render() {
    return (
      <html>
        <body>
          <div
              dangerouslySetInnerHTML={{__html: this.props.file.contents}}
            />
        </body>
      </html>
    )
  }
}
