import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {root} = this.props;
    let activeName = '';

    if (root) {
      activeName = 'active';
    }
    return (
      <aside className="sidebar">
        <ul>
          <li><Link to={`/admin`} className={activeName}>书签分类</Link></li>
          <li><Link to={`/admin/bookmarks`} activeClassName="active">书签列表</Link></li>
        </ul>
      </aside>
    );
  }
}
