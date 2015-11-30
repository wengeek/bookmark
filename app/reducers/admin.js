import {CATEGORIES, CATEGORY, TAG, CATEGORIES_WITH_SUBDOC, BOOKMARK} from '../constants/ActionTypes';

export default function admin(state = {
  categories: [],
  category: {},
  tag: {},
  bookmark: {}
}, action) {
  switch (action.type) {
  case CATEGORIES:
    return Object.assign({}, state, {
      categories: action.categories
    });
  case CATEGORIES_WITH_SUBDOC:
    return Object.assign({}, state, {
      categoriesWithSubdoc: action.categoriesWithSubdoc
    });
  case CATEGORY:
    return Object.assign({}, state, {
      category: action.category
    });
  case TAG:
    return Object.assign({}, state, {
      tag: action.tag
    });
  case BOOKMARK:
    return Object.assign({}, state, {
      bookmark: action.bookmark
    });
  default:
    return state;
  }
}
