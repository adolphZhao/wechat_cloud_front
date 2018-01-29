import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认要删除此视频配置么?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '视频ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '分享时间',
      dataIndex: 'stop_time',
      key: 'stop_time',
      width: 30,
    }, {
      title: '视频编码',
      dataIndex: 'code',
      key: 'code',
      width: 60,
    }, {
      title: '分享权重',
      dataIndex: 'weight',
      key: 'weight',
      width: 30,
    },{
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const expandedOneRowRender = (record)=>{ return  record.config.map(cfg=><p key={cfg.id} style={{textAlign: 'left'}}><span style={{width:400,display:'inline-block'}} title = {cfg.title}>{cfg.title.substr(0,25)+'...'}</span><span title = {cfg.image}>{cfg.image.substr(0,25)+'...'}</span></p>)}

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        expandedRowRender={expandedOneRowRender}
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
