import React, {Component} from 'react';

export default class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetErrorMessage();
  }

  handleSubmit(e) {
    e.preventDefault();
    let category = this.refs.category.value;
    let desc = this.refs.desc.value;

    this.props.addCategory(category, desc);
  }

  showError(msg) {
    return (
      <div className="form-group error">
        <span>{msg}</span>
      </div>
    );
  }

  render() {
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
           <input type="text" className="form-control" required placeholder="分类名称" ref="category" />
        </div>
        <div className="form-group">
           <input type="text" className="form-control" placeholder="分类描述(可选)" ref="desc" />
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
