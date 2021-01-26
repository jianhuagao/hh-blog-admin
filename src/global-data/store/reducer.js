import { Map } from 'immutable'
import * as Type from './constants'
const defaultState = Map({
  user: [],
})
function reducer(state = defaultState, actions) {
  switch (actions.type) {
    case Type.CHANGE_USER:
      return state.set("user", actions.user)
    default:
      return state
  }
}

export default reducer
