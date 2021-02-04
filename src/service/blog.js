import request from './request'
export function getBlog(offset, limit) {
  return request({
    url: '/blog',
    params: {
      offset,
      limit
    }
  })
}

export function editBlog(id, data) {
  return request({
    method:'put',
    url: `/blog/${id}`,
    data
  })
}

export function addBlog(data) {
  return request({
    method:'post',
    url: `/blog`,
    data
  })
}

export function deleteBlog(id) {
  return request({
    method:'delete',
    url: `/blog/${id}`
  })
}
