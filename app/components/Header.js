import React, {Component} from 'react';
import {Link} from 'react-router';
import auth from '../utils/auth';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    auth.logout();
    this.props.logout();
  }

  render() {
    return (
      <header className="header">
        <Link to={`/`} className="brand"><i className="fa fa-bookmark"></i> 前端书签</Link>
        {auth.loggedIn() && 
          <div className="pull-right">
            <a href="https://github.com/wengeek/bookmark" target="_blank"><i className="fa fa-github"></i></a>
            <Link to={`/admin`} activeClassName="active"><i className="fa fa-user"></i> {auth.getUser()}</Link>
            <a href="#" onClick={this.onLogout}><i className="fa fa-sign-out"> 登出</i></a>
          </div>
        }
        {
          auth.loggedIn() ||
          <div className="pull-right">
            <a href="https://github.com/wengeek/bookmark" target="_blank"><i className="fa fa-github"></i></a>
            <Link to={`/admin/login`} activeClassName="active">登录</Link>
            <Link to={`/admin/register`} activeClassName="active">注册</Link>
          </div>          
        }
      </header>
    );
  }
}
