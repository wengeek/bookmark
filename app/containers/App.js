import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const {history} = this.props;

    history.replaceState(null, '/');
  }

  render() {
    return (
      <div>
        <Header logout={this.logout}/>
        <div className="main">
          {this.props.children || <div>Bookmarks</div>}
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node,
  logout: PropTypes.Func
};

function mapStateToProps() {
  return {
    rtn: 0
  };
}

export default connect(mapStateToProps)(App);