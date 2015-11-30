import {CATEGORY_WITH_NO_EMPTY, TAGS} from '../constants/ActionTypes';

export default function app(state = {
  categories: [],
  tags: []
}, action) {
  switch (action.type) {
  case CATEGORY_WITH_NO_EMPTY:
    return Object.assign({}, state, {
      categories: action.categories
    });
  case TAGS: 
    return Object.assign({}, state, {
      tags: action.tags
    });
  default:
    return state;
  }
}
