import { request, config } from 'utils'

const { api } = config
const { wechat, wechatOption } = api

export async function query (data) {
  return request({
    url: wechat,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: wechatOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: wechat,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: wechatOption,
    method: 'delete',
    data,
  })
}
