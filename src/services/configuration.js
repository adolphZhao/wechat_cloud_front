import { request, config } from 'utils'

const { api } = config
const { video,videoOption } = api

export async function all (data) {
  return request({
    url: video,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: videoOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: video,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: videoOption,
    method: 'delete',
    data,
  })
}
