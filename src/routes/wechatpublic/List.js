import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Tag} from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem,onBindUrl,onHostDelete, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除此微信公众号配置?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }else if (e.key === '3') {
      onBindUrl(record)
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 120,
    }, {
      title: 'APPID',
      dataIndex: 'app_id',
      key: 'app_id',
      width: 120,
    }, {
      title: 'APPSECRET',
      dataIndex: 'app_secret',
      key: 'app_secret',
      width: 60,
    },{
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '绑定域名' },{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const expandedOneRowRender = (record)=>{ return  record.config&&record.config.map(cfg=><Tag style={{display:'block',margin:'3px'}} key={cfg.id} >{cfg.hosts}</Tag>)}

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
