import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import AdminHeader from '../components/AdminHeader';

class Admin extends Component {
  render() {
    let {children} = this.props;
    return (
      <div>
        <AdminHeader />
        {children}
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
