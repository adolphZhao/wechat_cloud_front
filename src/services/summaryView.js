import { request, config } from 'utils'

const { api } = config
const { summary, summaryOption } = api

export async function query (data) {
  return request({
    url: summary,
    method: 'get',
    data,
  })
}

export async function update (data) {
  return request({
    url: summaryOption,
    method: 'put',
    data,
  })
}

export async function create (data) {
  return request({
    url: summary,
    method: 'post',
    data,
  })
}

export async function remove (data) {
  return request({
    url: summaryOption,
    method: 'delete',
    data,
  })
}

export async function changeGuideStatus (data) {
  console.log(data);
  return request({
    url: summaryOption,
    method: 'put',
    data,
  })
}
