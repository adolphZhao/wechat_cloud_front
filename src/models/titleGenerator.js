/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update , query ,videos } from 'services/titleGenerator'
import queryString from 'query-string'
import { pageModel } from './common'
import { notification } from 'antd'

const openNotification = (title,desc) => {
  notification.success({
    message: title,
    description: desc,
  });
};


const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'titleGenerator',

  state: {
    videos:[],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/title-generator') {
          dispatch({
            type: 'query',
            payload: queryString.parse(location.search),
          }),
          dispatch({
            type: 'videos',
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      const {list} = data.data

      if (list) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 20,
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.titleGenerator)

      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ titleGenerator }) => titleGenerator.currentItem.id)
      const newSettings = { ...payload, id }
      const data = yield call(update, newSettings)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * videos ({ payload }, {  call, put }) {
      const data = yield call(videos,payload)
      if (data.success) {
        yield put({type: 'updateState',payload:{ videos: data.data }})
      } else {
        throw data
      }
    },

    * publish({payload} ,{call,put}) {
      const data = yield call(publish,payload)
      if (data.success) {
        yield put({ type: 'query' })
        openNotification('发布成功','此配置已经生效，页面的配置已经注入缓存，你可以在输出的可视化页面内查看变化。');
      } else {
        throw data
      }
    }
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
