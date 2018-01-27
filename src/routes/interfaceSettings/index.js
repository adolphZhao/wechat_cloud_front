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


const InterfaceSettings = ({ location, dispatch, interfaceSettings, loading }) => {
  location.query = queryString.parse(location.search)

  const { videos,list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = interfaceSettings

  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {videos:videos.list} :{...currentItem,videos:videos.list},
    visible: modalVisible,
    width: 800,
    confirmLoading: loading.effects['interfaceSettings/update'],
    title: `${modalType === 'create' ? '创建接口配置' : '修改接口配置'}`,
    wrapClassName: 'vertical-center-modal',
    maskClosable:modalType === 'view'?true:false,
    onOk (data) {
      dispatch({
        type: `interfaceSettings/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'interfaceSettings/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['interfaceSettings/query'],
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
        type: 'interfaceSettings/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'interfaceSettings/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onPublishItem (item) {
      dispatch({
        type: 'interfaceSettings/publish',
        payload:item,
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
        pathname: '/intetrface-settings',
        search: queryString.stringify({
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        }),
      })) : dispatch(routerRedux.push({
        pathname: '/intetrface-settings',
      }))
    },
    onAdd () {
      dispatch({
        type: 'interfaceSettings/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'interfaceSettings/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'interfaceSettings/multiDelete',
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

InterfaceSettings.propTypes = {
  interfaceSettings: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ interfaceSettings, loading }) => ({ interfaceSettings, loading }))(InterfaceSettings)
