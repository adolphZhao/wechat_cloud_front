import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Popover } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
//import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, ...tableProps }) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      confirm({
        title: '导流功能已经设置为自动导流',
        onOk () {

        },
      })
    } else if (e.key === '2') {
      onDeleteItem(record.id)
    }
  }

  const columns = [
    {
      title: '入口地址',
      dataIndex: 'domain',
      key: 'domain',
      width: 120,
      render: (text,record)=> (<span >{text+(record.ip_address?'('+record.ip_address+')':'')} </span>)
    }, {
      title: '访问',
      dataIndex: 'hits',
      key: 'hits',
      width: 60,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 60,
      render: text => (<span style={{color: text?'#ff0000':'#00ff22'}}>{text
        ? '被封'
        : '正常'}</span>),
    }, {
      title: '预览',
      dataIndex: 'url',
      key: 'url',
      width: 60,
      render: (text,record) => <Popover placement="right" content={<img src={record.imgdata} />} ><a href={text}  target="_blank">查看</a></Popover>,
    }, {
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '2', name: '删除域名' }]} />
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        pagination={false}
        scroll={{ x: 1250 }}
        columns={columns}
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default List
