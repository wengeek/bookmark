import React, {Component} from 'react';

export default class BookmarkForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.state = {tags: []};
  }

  handleSubmit(e) {
    e.preventDefault();
    let bookmark = this.refs.bookmark.value;
    let url = this.refs.url.value;
    let desc = this.refs.desc.value;
    let tag = this.refs.tag.value;

    this.props.addBookmark({
      name: bookmark,
      desc: desc,
      tag: tag,
      url: url
    });
  }

  showError(msg) {
    return (
      <div className="form-group error">
        <span>{msg}</span>
      </div>
    );
  }

  onCategoryChange(e) {
    let categories = this.props.categories;
    let categoryId = e.target.value;

    if (categoryId === '') {
      this.setState({tags: []});
      return;
    }

    for (let i = 0, length = categories.length; i < length; i++) {
      if (categories[i]._id === categoryId) {
        this.setState({tags: categories[i].tags});
        break;
      }
    }
  }

  render() {
    return (
      <form className="bookmark-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" required placeholder="书签名称" ref="bookmark" />
        </div>
        <div className="form-group">
          <input type="url" className="form-control" required placeholder="书签地址(需要带上协议)" ref="url" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="书签描述(可选)" ref="desc"/>
        </div>
        <div className="form-group">
          <select className="form-control" required ref="category" onChange={this.onCategoryChange}>
            <option value="">--请选择分类--</option>
            {this.props.categories &&
              this.props.categories.map(category => {
                return <option key={category._id} value={category._id}>{category.name}</option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <select className="form-control" required ref="tag">
            <option value="">--请选择标签--</option>
            {this.state.tags &&
              this.state.tags.map(tag => {
                return <option key={tag._id} value={tag._id}>{tag.name}</option>;
              })
            }
          </select>
        </div>
        {this.showError(this.props.errorMessage)}
        <div className="form-group">
          <button className="btn">保存</button>
          <span className="btn cancel" onClick={this.props.hideForm}>取消</span>
        </div>
      </form>
    );
  }
}
