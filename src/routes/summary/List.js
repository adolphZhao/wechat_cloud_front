import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Popover } from 'antd'
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
        title: '功能还没开发！！！',
        onOk () {
            //onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '入口地址',
      dataIndex: 'domain',
      key: 'domain',
      width: 120,
    }, {
      title: '导流设置',
      dataIndex: 'guide',
      key: 'guide',
      width: 120,
      render: (guide,record)=> (guide?<span >{guide +' , '+ record.percent +' ‰ '} </span>:'')
    }, {
      title: '访问',
      dataIndex: 'hits',
      key: 'hits',
      width: 60,
    }, {
      title: '状态',
      dataIndex: 'health',
      key: 'health',
      width: 60,
      render: text => (<span style={{color:'#00ff22'}}>{text
        ? '被封'
        : '正常'}</span>),
    }, {
      title: '预览',
      dataIndex: 'url',
      key: 'url',
      width: 60,
      render: (text,record) => <Popover placement="right" content={<img src={record.imgdata} />} ><Link to={text}  target="_blank">查看</Link></Popover>,
    }, {
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '设置导流' }, { key: '2', name: '删除域名' }]} />
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
