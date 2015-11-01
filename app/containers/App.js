import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children || <div>Hello bookmark.</div>}
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node
};

function mapStateToProps() {
  return {
    rtn: 0
  };
}

export default connect(mapStateToProps)(App);