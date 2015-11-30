import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.changeArrow = this.changeArrow.bind(this);
    this.changeSideheight = this.changeSideheight.bind(this);
    this.state = {arrowUp: false};
  }

  componentDidMount() {
    this.changeSideheight();
  }

  changeSideheight(arrowUp) {
    let sidebar = this.refs.side;
    let side = sidebar.getBoundingClientRect();
    let wrap = this.refs.wrap.getBoundingClientRect();
    let item = this.refs.item && this.refs.item.getBoundingClientRect();

    if (side.width === wrap.width && item) {
      if (arrowUp === false) {
        sidebar.style.height = wrap.height;
      } else {
        if (wrap.height === item.height) {
          this.refs.arrow.style.display = 'none';
        } else if (wrap.height > item.height){
          sidebar.style.height = item.height;
        }
      }
    }
  }

  changeArrow(e) {
    e.preventDefault();

    let {arrowUp} = this.state;

    this.changeSideheight(arrowUp);

    this.setState({arrowUp: !arrowUp});
  }

  render() {
    let {root, categories} = this.props;
    let arrowActive = '';
    if (this.state.arrowUp) {
      arrowActive = 'arrow-active';
    }

    return (
      <aside className="sidebar" ref="side">
        <div className="arrow" ref="arrow" onClick={this.changeArrow}>
          <i className={'fa fa-chevron-down ' + arrowActive}></i>
        </div>
        <ul ref="wrap">
          {categories && categories.map((category, index) => {
            return (
              <li key={category._id + index} ref={index === 0 ? 'item' : null}><Link to={`/category/` + category._id} className={index === 0 && root ? 'active' : ''} activeClassName="active">{category.name}</Link></li>
            );
          })}
        </ul>
      </aside>
    );
  }
}
