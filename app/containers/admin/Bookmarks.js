import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import BookmarkForm from '../../components/admin/BookmarkForm';
import CategoryItem from '../../components/admin/CategoryItem';
import {requestCategoriesWithSubdoc, requestAddBookmark} from '../../actions';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {addBookmark: false};
    this.addBookmark = this.addBookmark.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.addNewBookmark = this.addNewBookmark.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestCategoriesWithSubdoc());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookmark && (!this.props.bookmark || this.props.bookmark._id !== nextProps.bookmark._id)) {
      const {dispatch} = this.props;
      dispatch(requestCategoriesWithSubdoc());
    }
  }

  addBookmark() {
    this.setState({addBookmark: true});
  }

  hideForm() {
    this.setState({addBookmark: false});
  }

  addNewBookmark(params) {
    const {dispatch} = this.props;

    dispatch(requestAddBookmark(params, this.hideForm));
  }

  render() {
    const {categories} = this.props;
    let showAddButton = false;

    if (categories) {
      for (let category of categories) {
        if (category.tags && category.tags.length > 0) {
          showAddButton = true;
          break;
        }
      }
    } else {
      /*防止按钮闪烁*/
      return null;
    }

    return (
      <div className="mainsection">
        <div className="bookmark-add">
          {showAddButton && <button className="btn" onClick={this.addBookmark}>添加书签</button>}
          {!showAddButton && <div>您需要先 <Link to={`/admin`} className="btn">添加分类</Link></div>}
        </div>
        {this.state.addBookmark &&
          <BookmarkForm errorMessage={this.props.errorMessage} hideForm={this.hideForm} addBookmark={this.addNewBookmark} categories={this.props.categories}/>
        }
        <div className="bookmarks">
          {categories && categories.map(category => {
            return <CategoryItem key={category._id} category={category} />;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {admin, errorMessage} = state;

  return {
    categories: admin.categoriesWithSubdoc,
    bookmark: admin.bookmark,
    errorMessage
  };
}

export default connect(mapStateToProps)(Bookmarks);
