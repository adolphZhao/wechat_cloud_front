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
        title: '确认删除此参数配置?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '参数ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 120,
    },{
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      width: 30,
    }, {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      width: 60,
    }, {
      title: '位置', //上，下，原文，返回，作者
      dataIndex: 'position',
      key: 'position',
      width: 120,
      render: (text) => {switch(text){
        case 1:
          return '顶部广告';
        case 2:
          return '底部广告';
        case 3:
          return '作者链接';
        case 4:
          return '返回链接';
        default:
          return <span style={{color:'#ff0000'}}>位置错误</span>
        }}
    }, {
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

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
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
