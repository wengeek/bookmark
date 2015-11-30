import React, {Component} from 'react';
import CategoryForm from './CategoryForm';
import TagForm from './TagForm';

export default class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {addForm: false, addTag: false};
    this.addCategory = this.addCategory.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
  }

  componentDidMount() {
    let {requestCategories} = this.props.actions;

    requestCategories();
  }

  componentWillReceiveProps(nextProps) {
    let {requestCategories} = this.props.actions;

    if (nextProps.category._id !== this.props.category._id || nextProps.tag._id !== this.props.tag._id) {
      requestCategories();
    }
  }

  addCategory() {
    this.setState({addForm: true, addTag: false});
  }

  hideForm() {
    this.setState({addForm: false, addTag: false});
  }

  addTag() {
    this.setState({addForm: false, addTag: true});
  }

  addNewCategory(name, desc) {
    this.props.actions.requestAddCategory(name, desc, function() {
      this.hideForm();
    }.bind(this));
  }

  addNewTag(params) {
    this.props.actions.requestAddTag(params, function() {
      this.hideForm();
    }.bind(this));
  }

  render() {
    let {categories} = this.props;

    return (
      <section className="mainsection">
        <div className="category-add">
         <button className="btn" onClick={this.addCategory}>添加分类</button>
         {categories && categories.length >0 &&
           <button className="btn" onClick={this.addTag}>添加标签</button>
         }
        </div>
        {this.state.addForm &&
          <CategoryForm hideForm={this.hideForm} resetErrorMessage={this.props.actions.resetErrorMessage} addCategory={this.addNewCategory} errorMessage={this.props.errorMessage}/>
        }
        {this.state.addTag &&
          <TagForm hideForm={this.hideForm} resetErrorMessage={this.props.actions.resetErrorMessage} addTag={this.addNewTag} categories={categories} errorMessage={this.props.errorMessage}/>
        }
        <div className="categories">
          <ul>
            {categories && categories.map(category => {
              return (
                <li key={category._id}>
                  <div className="category-title"><div>{category.name}</div></div>
                  <div className="category-content">
                    {category.tags && category.tags.map(tag => {
                      return (<span className="item" key={tag._id}>{tag.name}</span>);
                    })}
                    {category.tags && category.tags.length === 0 &&
                      <span className="item">暂无标签</span>
                    }
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}
