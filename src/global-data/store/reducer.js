import { Map } from 'immutable'
import * as Type from './constants'
const defaultState = Map({
  user: [],
  globalLoading: false,
})
function reducer(state = defaultState, actions) {
  switch (actions.type) {
    case Type.CHANGE_USER:
      return state.set("user", actions.user)
    case Type.CHANGE_GLOBALLOADING:
      return state.set("globalLoading", actions.globalLoading)
    default:
      return state
  }
}

export default reducer
