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


const GuideSettings = ({ location, dispatch, guideSettings, loading }) => {
  location.query = queryString.parse(location.search)

  const { domain,list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = guideSettings

  const { pageSize } = pagination

  const modalProps = {
    item: {'domain':domain ,'relation':list},
    visible: modalVisible,
    width: 800,
    confirmLoading: loading.effects['guideSettings/update'],
    title: `${modalType === 'create' ? '创建导流规则' : '修改导流规则'}`,
    wrapClassName: 'vertical-center-modal',
    maskClosable:modalType === 'view'?true:false,
    onOk (data) {
      dispatch({
        type: `guideSettings/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'guideSettings/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['guideSettings/query'],
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
    onDeleteItem (record) {
      dispatch({
        type: 'guideSettings/delete',
        payload: record,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'guideSettings/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onPublishItem (item) {
      dispatch({
        type: 'guideSettings/publish',
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
    onAdd () {
      dispatch({
        type: 'guideSettings/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'guideSettings/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'guideSettings/multiDelete',
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

GuideSettings.propTypes = {
  GuideSettings: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ guideSettings, loading }) => ({ guideSettings, loading }))(GuideSettings)
