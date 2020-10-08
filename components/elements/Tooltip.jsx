import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const propTypes = {
  placement:  PropTypes.string.isRequired,
  x:      PropTypes.number.isRequired,
  y:   PropTypes.number.isRequired,
  content:   PropTypes.string.isRequired
}


class Tooltip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {left:this.props.x, top:this.props.y, display: this.props.showTooltip ? 'block' : 'none'};
    return (
      <div style={style} className={"tooltip " + this.props.placement} onMouseMoveCapture={this.props.mouseCapture} onMouseLeave={this.props.detailView}>
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">
            {this.props.content}
        </div>
      </div>
    );
  }

}

export default Tooltip;

