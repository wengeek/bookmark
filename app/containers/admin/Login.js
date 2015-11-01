import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    return;
  }

  render() {
    return (
      <div>
        <form className="register" onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Your email" ref="email" />
          <input type="password" placeholder="Your password" ref="pass" />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    rtn: 0
  };
}

export default connect(mapStateToProps)(Login);
