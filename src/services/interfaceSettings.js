import { request, config } from 'utils'

const { api } = config
const { pageSettings,pageSettingsOption,video } = api

export async function query (data) {
  return request({
    url: pageSettings,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: pageSettingsOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: pageSettings,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: pageSettingsOption,
    method: 'delete',
    data,
  })
}

export async function videos (data) {
  return request({
    url: video,
    method: 'get',
    data,
  })
}

export async function publish (data) {
  return request({
    url: pageSettingsOption,
    method: 'post',
    data,
  })
}
