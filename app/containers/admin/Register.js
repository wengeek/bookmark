import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestRegister} from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let {dispatch} = this.props;
    e.preventDefault();
    dispatch(requestRegister(this.refs.username.value, this.refs.email.value, this.refs.pass.value));
    return;
  }

  render() {
    return (
      <form className="register" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="username" />
        <input type="email" placeholder="Your email" ref="email" />
        <input type="password" placeholder="Your password" ref="pass" />
        <input type="submit" value="Register" />
      </form>
    );
  }
}

function mapStateToProps() {
  return {
    rtn: 0
  };
}

export default connect(mapStateToProps)(Register);
