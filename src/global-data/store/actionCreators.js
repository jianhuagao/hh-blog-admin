import * as action from './constants'

export const changeUserAction = (res) => {
  return dispatch=>{
    dispatch({
      type: action.CHANGE_USER,
      user: res
    })
  }
}
