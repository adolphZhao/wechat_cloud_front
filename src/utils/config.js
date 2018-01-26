const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'WECHAT Admin',
  prefix: '',
  footerText: 'Created by adolph © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userInfo: `${APIV1}/user/detail`,
    user: `${APIV1}/user/detail`,

    video: `${APIV1}/video`,
    videoOption: `${APIV1}/video/:id`,

    settings:`${APIV1}/settings`,
    settingsOption:`${APIV1}/settings/:id`,

    wechat:`${APIV1}/public-setting`,
    wechatOption:`${APIV1}/public-setting/:id`,

    summary: `${APIV1}/summary`,
    summaryOption: `${APIV1}/summary/:id`,

    pageSettings: `${APIV1}/page-settings`,
    pageSettingsOption: `${APIV1}/page-settings/:id`,

    menus: `${APIV1}/menus`,
  },
}
