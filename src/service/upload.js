import request from './request'

export function uploadImg(img) {
  const param = new FormData()
  param.append('img', img.file, img.name)

  return request({
    method:"post",
    url: '/uploadImg',
    config:{
      'Content-Type':'multipart/form-data'
    },
    data:param
  })
}
