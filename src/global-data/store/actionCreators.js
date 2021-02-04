import * as action from './constants'

export const changeUserAction = (res) => {
  return dispatch=>{
    dispatch({
      type: action.CHANGE_USER,
      user: res
    })
  }
}
export const changeGlobalLoadingAction = (res) => {
  return dispatch=>{
    dispatch({
      type: action.CHANGE_GLOBALLOADING,
      globalLoading: res
    })
  }
}
