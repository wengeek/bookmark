/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
/*eslint-enable no-unused-vars*/

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children || <div>Hello world.</div>}
      </div>
    );
  }
}
