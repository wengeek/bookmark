import React, {Component, PropTypes} from 'react';
import Header from '../components/Header';
import {requestCategoriesWithNoEmpty} from '../actions';

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
        <Header logout={this.logout} />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node,
  logout: PropTypes.Func
};

export default App;
