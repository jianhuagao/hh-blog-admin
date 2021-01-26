import * as action from './constants'
import {
  BlogType
} from '@/service/blogtype'

const changeBlogTypeAction = (res) => {
  return {
    type: action.CHANGE_BLOGTYPE,
    blogType: res
  }
}

export const getBlogTypeAction = () => {
  return dispatch => {
    BlogType().then(res => {
      dispatch(changeBlogTypeAction(res))
    })
  }
}
