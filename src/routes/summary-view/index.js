import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page, Refresh} from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Summary = ({ location, dispatch, summaryView, loading }) => {
  location.query = queryString.parse(location.search)

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = summaryView
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {'type':'ipaddress','list':list} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['summaryView/update'],
    title: `${modalType === 'create' ? '统计负载IP' : '设置导流'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'summaryView/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'summaryView/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['summaryView/query'],
    onDeleteItem (id) {
      dispatch({
        type: 'summaryView/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'summaryView/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onGuideChange(item) {
      item.guide_status = !item.guide_status;
      dispatch({
        type: 'summaryView/changeGuideStatus',
        payload: item,
      })
    }
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'summaryView/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const handleRefresh = (state) =>{
    console.log('refresh')
    if(state&&state.refresh){
      dispatch({
        type: 'summaryView/query'
      })
    }
  }

  const filterProps = {
    onAdd () {
      dispatch({
        type: 'summaryView/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }
/*  <!--



-->*/
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

export default connect(({ summaryView, loading }) => ({ summaryView, loading }))(Summary)
