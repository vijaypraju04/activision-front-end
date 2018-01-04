import { FETCH_CATEGORIES, FETCH_CATEGORY_LIST } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CATEGORY_LIST:
    const categoryList = action.payload.map(category => {
      return category.name
    })
    return categoryList
    case FETCH_CATEGORIES:
      return action.payload
    default:
      return state
  }
}
