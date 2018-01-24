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


const Summary = ({ location, dispatch, summary, loading }) => {
  location.query = queryString.parse(location.search)

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = summary
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['summary/update'],
    title: `${modalType === 'create' ? '设置导流' : '设置导流'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `summary/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'summary/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['summary/query'],
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
        type: 'summary/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'summary/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'summary/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Summary.propTypes = {
  summary: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ summary, loading }) => ({ summary, loading }))(Summary)
