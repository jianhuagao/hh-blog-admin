import { Map } from 'immutable'
import * as Type from './constants'
const defaultState = Map({
  blogType: [],
  bannerData: [],
  area: [],
  imgPool: [],
  blog: [],
  blogDetail: {},
})
function reducer(state = defaultState, actions) {
  switch (actions.type) {
    case Type.CHANGE_BLOGTYPE:
      return state.set("blogType", actions.blogType)
    case Type.CHANGE_BANNERDATA:
      return state.set("bannerData", actions.bannerData)
    case Type.CHANGE_AREA:
      return state.set("area", actions.area)
    case Type.CHANGE_IMGPOOL:
      return state.set("imgPool", actions.imgPool)
    case Type.CHANGE_BLOG:
      return state.set("blog", actions.blog)
    case Type.CHANGE_BLOGDETAIL:
      return state.set("blogDetail", actions.blogDetail)
    default:
      return state
  }
}

export default reducer
