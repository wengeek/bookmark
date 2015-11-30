import React, {Component} from 'react';

export default class TagItem extends Component {
  render() {
    const {tag} = this.props;
    return (
      <div className="tag">
        <h4>{tag.name}</h4>
        <div className="bookmarks">
          {tag.bookmarks.map(bookmark => {
            return <a href={bookmark.url} key={bookmark._id} className="item">{bookmark.name}</a>;
          })}
        </div>
      </div>
    );
  }
}
