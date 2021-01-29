import request from './request'

export function getBlogType(offset, limit) {
  return request({
    url: '/blogType',
    params: {
      offset,
      limit
    }
  })
}

export function editBlogType(id, data) {
  return request({
    method:'put',
    url: `/blogType/${id}`,
    data
  })
}

export function addBlogType(data) {
  return request({
    method:'post',
    url: `/blogType`,
    data
  })
}

export function deleteBlogType(id) {
  return request({
    method:'delete',
    url: `/blogType/${id}`
  })
}
