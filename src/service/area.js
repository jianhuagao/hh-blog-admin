import request from './request'

export function getArea(offset, limit) {
  return request({
    url: '/area',
    params: {
      offset,
      limit
    }
  })
}

export function editArea(id, data) {
  return request({
    method:'put',
    url: `/area/${id}`,
    data
  })
}

export function addArea(data) {
  return request({
    method:'post',
    url: `/area`,
    data
  })
}

export function deleteArea(id) {
  return request({
    method:'delete',
    url: `/area/${id}`
  })
}
