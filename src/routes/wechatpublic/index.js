import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Wechatpublic = ({ location, dispatch, wechatpublic, loading }) => {
  location.query = queryString.parse(location.search)

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = wechatpublic
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['wechatpublic/update'],
    title: `${modalType === 'create' ? '创建微信公众号参数配置' : '修改微信公众号参数配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `wechatpublic/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'wechatpublic/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['wechatpublic/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'wechatpublic/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'wechatpublic/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        search: queryString.stringify({
          ...value,
          page: 1,
          pageSize,
        }),
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/wechat-public-settings',
        search: queryString.stringify({
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        }),
      })) : dispatch(routerRedux.push({
        pathname: '/wechat-public-settings',
      }))
    },
    onAdd () {
      dispatch({
        type: 'wechatpublic/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'wechatpublic/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'wechatpublic/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Wechatpublic.propTypes = {
  wechatpublic: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ wechatpublic, loading }) => ({ wechatpublic, loading }))(Wechatpublic)
