import React, {Component} from 'react';
import TagItem from './TagItem';

export default class MainSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainsection app">
        {this.props.tags && this.props.tags.map(tag => {
          return <TagItem key={tag._id} tag={tag} />;
        })}
      </div>
    );
  }
}
