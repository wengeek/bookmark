import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Sidebar from '../components/admin/Sidebar';
import MainSection from '../components/admin/MainSection';
import * as bookmarkActions from '../actions';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, dispatch} = this.props;
    let actions = bindActionCreators(bookmarkActions, dispatch);

    return (
      <div className="admin">
        <Sidebar root={!children}/>
        {children ||
          <MainSection actions={actions} categories={this.props.categories} category={this.props.category} tag={this.props.tag} errorMessage={this.props.errorMessage} />
        }
      </div>
    );
  }
}

Admin.PropTypes = {
  children: PropTypes.node
};

function mapStateToProps(state) {
  const {admin, errorMessage} = state;

  return {
    categories: admin.categories,
    category: admin.category,
    tag: admin.tag,
    errorMessage
  };
}

export default connect(mapStateToProps)(Admin);
