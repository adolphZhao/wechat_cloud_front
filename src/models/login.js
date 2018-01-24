import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import { login } from 'services/login'
import * as userService from 'services/user'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    * login ({
      payload,
    }, { put, call }) {
      // yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      // yield put({ type: 'hideLoginLoading' })
      if (data.data) {
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        window.localStorage.setItem('token', data.data)
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/summary'))
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
