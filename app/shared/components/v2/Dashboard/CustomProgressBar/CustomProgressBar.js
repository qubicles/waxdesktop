import React from "react"
import PropTypes from "prop-types"
import { Progress } from "semantic-ui-react"

import "./CustomProgressBar.global.css"


class CustomProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    const { label, percent, statusColor} = this.props
    return (
        <div className="progressbar-container">
            <div className="progressbar-label">
                <div className="left-label">{label}</div>
                <div className="right-label">{percent}% of Capacity</div>
            </div>
            <Progress percent={percent} inverted color={statusColor} /> 
            <div className="progressbar-inner-label">115WAX</div>
        </div>
        
    )
  }
}

CustomProgressBar.propTypes = {}

CustomProgressBar.defaultProps = {}

export default CustomProgressBar
