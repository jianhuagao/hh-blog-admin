import request from './request'

export function getBannerData(offset, limit) {
  return request({
    url: '/banner',
    params: {
      offset,
      limit
    }
  })
}

export function editBanner(id, data) {
  return request({
    method:'put',
    url: `/banner/${id}`,
    data
  })
}

export function addBanner(data) {
  return request({
    method:'post',
    url: `/banner`,
    data
  })
}

export function deleteBanner(id) {
  return request({
    method:'delete',
    url: `/banner/${id}`
  })
}
