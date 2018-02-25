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
      title: '映射ID',
      dataIndex: 'map_id',
      key: 'map_id',
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
      title: '标题模板',
      dataIndex: 'template',
      key: 'template',
      width: 160,
    },{
      title: '观看量',
      dataIndex: 'views',
      key: 'views',
      width: 30,
    },{
      title: '增长率',
      dataIndex: 'yesterday',
      key: 'yesterday',
      width: 30,
      render:(text,record)=>{
        if(text==0)
        {
          return '0%';
        }
        return  Math.round((record.views-text)/text*10000)/100+'%'
      }
    },{
      title: '配置',
      key: 'operation',
      width: 40,
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
