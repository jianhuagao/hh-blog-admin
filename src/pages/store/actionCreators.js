import * as action from './constants'
import {
  getBlogType,
  editBlogType,
  deleteBlogType,
  addBlogType
} from '@/service/blogtype'
import {
  getBannerData,
  editBanner,
  deleteBanner,
  addBanner
} from '@/service/bannerdata'
import {
  getArea,
  editArea,
  deleteArea,
  addArea
} from '@/service/area'
import {
  getImgPool,
  deleteImgPool
} from '@/service/imgPool'
import {
  getBlog,
  editBlog,
  deleteBlog,
  getBlogDetail
} from '@/service/blog'
import {
  getAccess,
  deleteAccess
} from '@/service/access'


//BlogType~
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
export const editBlogTypeAction = (id, data, offset, limit) => {
  return dispatch => {
    editBlogType(id, data).then(res => {
      dispatch(getBlogTypeAction(offset, limit))
    })
  }
}
export const addBlogTypeAction = (data, offset, limit) => {
  return dispatch => {
    addBlogType(data).then(res => {
      dispatch(getBlogTypeAction(offset, limit))
    })
  }
}
export const delBlogTypeAction = (id, offset, limit) => {
  return dispatch => {
    deleteBlogType(id).then(res => {
      dispatch(getBlogTypeAction(offset, limit))
    })
  }
}


//bannerData~
const changeBannerDataAction = (res) => {
  return {
    type: action.CHANGE_BANNERDATA,
    bannerData: res
  }
}
export const getBannerDataAction = (offset, limit) => {
  return dispatch => {
    getBannerData(offset, limit).then(res => {
      dispatch(changeBannerDataAction(res))
    })
  }
}
export const editBannerDataAction = (id, data, offset, limit) => {
  return dispatch => {
    editBanner(id, data).then(res => {
      dispatch(getBannerDataAction(offset, limit))
    })
  }
}
export const addBannerDataAction = (data, offset, limit) => {
  return dispatch => {
    addBanner(data).then(res => {
      dispatch(getBannerDataAction(offset, limit))
    })
  }
}
export const delBannerDataAction = (id, offset, limit) => {
  return dispatch => {
    deleteBanner(id).then(res => {
      dispatch(getBannerDataAction(offset, limit))
    })
  }
}

//area~
const changeAreaAction = (res) => {
  return {
    type: action.CHANGE_AREA,
    area: res
  }
}
export const getAreaAction = (offset, limit) => {
  return dispatch => {
    getArea(offset, limit).then(res => {
      dispatch(changeAreaAction(res))
    })
  }
}
export const editAreaAction = (id, data, offset, limit) => {
  return dispatch => {
    editArea(id, data).then(res => {
      dispatch(getAreaAction(offset, limit))
    })
  }
}
export const addAreaAction = (data, offset, limit) => {
  return dispatch => {
    addArea(data).then(res => {
      dispatch(getAreaAction(offset, limit))
    })
  }
}
export const delAreaAction = (id, offset, limit) => {
  return dispatch => {
    deleteArea(id).then(res => {
      dispatch(getAreaAction(offset, limit))
    })
  }
}

//imgPool~
const changeImgPoolAction = (res) => {
  return {
    type: action.CHANGE_IMGPOOL,
    imgPool: res
  }
}
export const getImgPoolAction = (offset, limit) => {
  return dispatch => {
    getImgPool(offset, limit).then(res => {
      dispatch(changeImgPoolAction(res))
    })
  }
}
export const delImgPoolAction = (id, offset, limit) => {
  return dispatch => {
    deleteImgPool(id).then(res => {
      dispatch(getImgPoolAction(offset, limit))
    })
  }
}

//blog~
const changeBlogAction = (res) => {
  return {
    type: action.CHANGE_BLOG,
    blog: res
  }
}
export const getBlogAction = (offset, limit) => {
  return dispatch => {
    getBlog(offset, limit).then(res => {
      dispatch(changeBlogAction(res))
    })
  }
}
export const editBlogAction = (id, data, offset, limit) => {
  return dispatch => {
    editBlog(id, data).then(res => {
      dispatch(getBlogAction(offset, limit))
    })
  }
}

export const delBlogAction = (id, offset, limit) => {
  return dispatch => {
    deleteBlog(id).then(res => {
      dispatch(getBlogAction(offset, limit))
    })
  }
}

const changeBlogDetailAction = (res) => ({
  type: action.CHANGE_BLOGDETAIL,
  blogDetail: res
})

export const getBlogDetailAction = (id) => {
  return dispatch => {
    //如果是新增,则不需要
    if (id==="new") {
      dispatch(changeBlogDetailAction({}))
    }else{
      getBlogDetail(id).then(res => {
        dispatch(changeBlogDetailAction(res))
      })
    }
  }
}

//access~
const changeAccessAction = (res) => {
  return {
    type: action.CHANGE_ACCESS,
    access: res
  }
}
export const getAccessAction = (offset, limit) => {
  return dispatch => {
    getAccess(offset, limit).then(res => {
      dispatch(changeAccessAction(res))
    })
  }
}
export const delAccessAction = (id, offset, limit) => {
  return dispatch => {
    deleteAccess(id).then(res => {
      dispatch(getAccessAction(offset, limit))
    })
  }
}