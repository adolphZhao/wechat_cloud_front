import { request, config } from 'utils'

const { api } = config
const { guideSettings,guideSettingsOption} = api

export async function query (data) {
  return request({
    url: guideSettings,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: guideSettingsOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: guideSettings,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: guideSettings,
    method: 'delete',
    data,
  })
}
