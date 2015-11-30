import React, {Component} from 'react';

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {category} = this.props;

    if (category.tags && category.tags.length === 0) {
      return null;
    }

    let isEmpty = true;

    category.tags.forEach(tag => {
      if (tag.bookmarks && tag.bookmarks.length > 0) {
        isEmpty = false;
      }
    });

    if (isEmpty) {
      return null;
    }

    return (
      <div className="category">
        <h3>{category.name}</h3>
        {category.tags && category.tags.map(tag => {
          if (tag.bookmarks && tag.bookmarks.length === 0) {
            return null;
          }
          return (
            <div className="tag" key={tag._id}>
              <h4>{tag.name}</h4>
              <div className="bookmark">
                {tag.bookmarks && tag.bookmarks.map(bookmark => {
                  return <a target="_blank" className="item" key={bookmark._id} href={bookmark.url} title={bookmark.description}>{bookmark.name}</a>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
