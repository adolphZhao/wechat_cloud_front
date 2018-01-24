import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

location.path = location.hash.split('#')
if (location.path.length > 1) {
  location.path = location.path[1].split('?')[0]
} else {
  location.path = '/'
}
// 4. Start
app.start('#root')
