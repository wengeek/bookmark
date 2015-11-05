import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestRegister} from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initRegister = true;
  }

  handleSubmit(e) {
    let {dispatch, history, location} = this.props;
    e.preventDefault();
    dispatch(requestRegister(this.refs.username.value, this.refs.email.value, this.refs.pass.value, function() {
      if (location.state && location.state.nextPathname) {
        history.replaceState(null, location.state.nextPathname);
      } else {
        history.replaceState(null, '/admin');
      }
    }));
    return;
  }

  renderErrMsg() {
    if (this.props.rtn === 0 || this.initRegister) {
      this.initRegister = false;
      return null;
    }
    return (
      <div className="form-group error">
        <span>{this.props.msg}</span>
      </div>
    );
  }  

  render() {
    return (
      <form className="register" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" required minLength="3" maxLength="10" placeholder="昵称" ref="username" />
        </div>
        <div className="form-group">
          <input type="email" className="form-control" required placeholder="邮箱" ref="email" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" required minLength="6" maxLength="20" placeholder="密码" ref="pass" />
        </div>
        {this.renderErrMsg()}        
        <div className="form-group">       
          <input type="submit" className="btn" value="注册" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const {admin} = state;
  return {
    rtn: admin.rtn,
    msg: admin.msg
  };
}

export default connect(mapStateToProps)(Register);
