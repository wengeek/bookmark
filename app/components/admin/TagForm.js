import React, {Component} from 'react';

export default class TagForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.resetErrorMessage();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addTag({
      name: this.refs.tag.value,
      desc: this.refs.desc.value,
      category: this.refs.category.value
    });
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
      <form className="tag-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
           <input type="text" className="form-control" required placeholder="标签名称" ref="tag" />
        </div>
        <div className="form-group">
           <input type="text" className="form-control" placeholder="标签描述(可选)" ref="desc" />
        </div>
        <div className="form-group">
          <select className="form-control" required ref="category">
            <option value="">--请选择分类--</option>
            {this.props.categories &&
              this.props.categories.map(category => {
                return <option key={category._id} value={category._id}>{category.name}</option>;
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
