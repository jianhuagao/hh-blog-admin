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

export const getBlogTypeAction = (offset, limit) => {
  return dispatch => {
    BlogType(offset, limit).then(res => {
      dispatch(changeBlogTypeAction(res))
    })
  }
}
