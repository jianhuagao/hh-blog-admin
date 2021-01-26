import { Map } from 'immutable'
import * as Type from './constants'
const defaultState = Map({
  blogType: [],
})
function reducer(state = defaultState, actions) {
  switch (actions.type) {
    case Type.CHANGE_BLOGTYPE:
      return state.set("blogType", actions.blogType)
    default:
      return state
  }
}

export default reducer
