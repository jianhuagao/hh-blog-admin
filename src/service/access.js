import request from './request'

export function getAccess(offset, limit) {
  return request({
    url: '/request',
    params: {
      offset,
      limit
    }
  })
}

export function deleteAccess(id) {
  return request({
    method:'delete',
    url: `/request/${id}`
  })
}
