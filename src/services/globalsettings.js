import { request, config } from 'utils'

const { api } = config
const { settings,settingsOption } = api

export async function all (data) {
  return request({
    url: settings,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: settingsOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: settings,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: settingsOption,
    method: 'delete',
    data,
  })
}
