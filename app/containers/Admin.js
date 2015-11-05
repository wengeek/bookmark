import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Admin extends Component {
  render() {
    let {children} = this.props;
    return (
      <div>
        {children || <div>mark</div>}
      </div>
    );
  }
}

Admin.PropTypes = {
  children: PropTypes.node
};

function mapStateToProps() {
  return {
    rtn: 0
  };
}

export default connect(mapStateToProps)(Admin);
