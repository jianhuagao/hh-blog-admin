import * as action from './constants'
import {
  getBlogType,
  editBlogType,
  deleteBlogType
} from '@/service/blogtype'

const changeBlogTypeAction = (res) => {
  return {
    type: action.CHANGE_BLOGTYPE,
    blogType: res
  }
}

export const getBlogTypeAction = (offset, limit) => {
  return dispatch => {
    getBlogType(offset, limit).then(res => {
      dispatch(changeBlogTypeAction(res))
    })
  }
}
export const editBlogTypeAction = (id, data,offset, limit) => {
  return dispatch => {
    editBlogType(id, data).then(res => {
      dispatch(getBlogTypeAction(offset, limit))
    })
  }
}
export const delBlogTypeAction = (id,offset, limit) => {
  return dispatch => {
    deleteBlogType(id).then(res => {
      dispatch(getBlogTypeAction(offset, limit))
    })
  }
}
