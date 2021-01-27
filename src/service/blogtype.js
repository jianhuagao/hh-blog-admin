import request from './request'

export function BlogType(offset, limit) {
  return request({
    url: '/blogType',
    params: {
      offset,
      limit
    }
  })
}

