import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Icon} from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { Column } = Table;
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onPublishItem,isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除域名导流么?',
        onOk () {
          onDeleteItem(record)
        },
      })
    } else if (e.key === '3') {
     onPublishItem(record)
   }
  }

  const handleViewClick=(record,e)=>{
    onViewItem(record)
  }

  const columns = [
    {
      title: '导流分组',
      dataIndex: 'domain',
      key: 'domain',
      width: 160,
    },{
      title: '导流时间',
      dataIndex: 'guide_time',
      key: 'guide_time',
      width: 30,
      render:text=>(text+ ' 小时')
    },{
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

const expandedOneRowRender = (record)=>{
   return <p style={{textAlign:'left'}}>
            <span>前缀：{record.prefix}</span>
            <span>核心词：{record.core}</span>
            <span>后缀：{record.suffix}</span>
        </p>}
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
  onPublishItem:PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
