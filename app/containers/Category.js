import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../components/Sidebar';
import MainSection from '../components/MainSection';
import {requestCategoriesWithNoEmpty, requestTags} from '../actions';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.hasCategoryId = false;//标识categoryId是否存在
    this.initTags = false;//标示是否本次初始化，用于防止出现分类为空时的闪现
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    const {categoryId} = params;

    dispatch(requestCategoriesWithNoEmpty());
    if (categoryId) {
      this.hasCategoryId = true;
      dispatch(requestTags(categoryId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, params} = this.props;
    const {categoryId} = params;
    const {categories} = nextProps;
    const nextCategoryId = nextProps.params.categoryId;

    this.initTags = true;
    if (nextCategoryId !== categoryId) { //update route
      if (nextCategoryId) {
        dispatch(requestTags(nextCategoryId));
      } else {
        if (categories && categories.length > 0) {
          dispatch(requestTags(categories[0]._id));
        }
      }
    } else if(!this.hasCategoryId) { //categoryId be null
      if (!categoryId && categories && categories.length > 0) {
        if (!this.hasCategoryId) {
          this.hasCategoryId = true;
          dispatch(requestTags(categories[0]._id));
        }
      }
    }
  }

  render() {
    const {categories, tags} = this.props;
    let root = false;
    if (!this.props.params.categoryId) {
      root = true;
    }
    return (
      <div>
        {this.initTags && categories && categories.length === 0 &&
          <div className="bookmark-empty">
            <i className="fa fa-coffee"></i>
            <div className="empty-content">空空如也，容我稍后添加</div>
          </div>
        }
        {categories && categories.length > 0 &&
          <Sidebar root={root} ref="sidebar" categories={categories} />
        }
        {tags && tags.length > 0 &&
          <MainSection tags={tags}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {app} = state;

  return {
    categories: app.categories,
    tags: app.tags
  };
}

export default connect(mapStateToProps)(Category);
