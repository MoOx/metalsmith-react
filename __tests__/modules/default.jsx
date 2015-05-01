import React, {Component, PropTypes} from "react"

export default class DefaultTemplate extends Component {

  static displayName = "DefaultTemplate"

  static propTypes = {
    file: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    a: PropTypes.string,
    file: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      a: this.props.a,
      file: this.props.file,
    }
  }

  render() {
    return (
      <html>
        <body>
          <a>{this.props.a}</a>
          <div
              dangerouslySetInnerHTML={{__html: this.props.file.contents}}
            />
        </body>
      </html>
    )
  }
}
