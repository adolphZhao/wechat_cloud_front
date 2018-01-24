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


const Globalsettings = ({ location, dispatch, globalsettings, loading }) => {
  location.query = queryString.parse(location.search)

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = globalsettings
  const { pageSize } = pagination
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 800,
    confirmLoading: loading.effects['globalsetting/update'],
    title: `${modalType === 'create' ? '创建参数配置' : '修改参数配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `globalsettings/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'globalsettings/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['globalsettings/all'],
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
        type: 'globalsettings/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'globalsettings/showModal',
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
        pathname: '/global-settings',
        search: queryString.stringify({
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        }),
      })) : dispatch(routerRedux.push({
        pathname: '/global-settings',
      }))
    },
    onAdd () {
      dispatch({
        type: 'globalsettings/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'globalsettings/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'globalsettings/multiDelete',
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

Globalsettings.propTypes = {
  globalsettings: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ globalsettings, loading }) => ({ globalsettings, loading }))(Globalsettings)
