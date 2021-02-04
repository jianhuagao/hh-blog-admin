import request from './request'

export function getImgPool(offset, limit) {
  return request({
    url: '/imgPool',
    params: {
      offset,
      limit
    }
  })
}

export function deleteImgPool(id) {
  return request({
    method:'delete',
    url: `/imgPool/${id}`
  })
}

