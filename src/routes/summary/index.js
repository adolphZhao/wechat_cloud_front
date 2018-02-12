import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page ,Refresh } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Summary = ({ location, dispatch, summary, loading }) => {
  location.query = queryString.parse(location.search)

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = summary
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {'type':'ipaddress','list':list} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['summary/update'],
    title: `${modalType === 'create' ? '统计负载IP' : '设置导流'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'summary/hideModal',
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

  const handleRefresh = (state) =>{

    if(state&&state.refresh){
      dispatch({
        type: 'summary/query'
      })
    }
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
        type: 'summary/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'wechatpublic/switchIsMotion' })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      <Refresh onRefresh={e => handleRefresh(e)}></Refresh>
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
