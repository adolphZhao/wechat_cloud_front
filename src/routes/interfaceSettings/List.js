import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Icon} from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onPublishItem,isMotion, location, ...tableProps }) => {
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
    } else if (e.key === '3') {
     onPublishItem(record)
   }
  }

  const handleViewClick=(record,e)=>{
    onViewItem(record)
  }

  const columns = [
    {
      title: '配置ID',
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },{
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      width: 120,
    },{
      title: '视频ID',
      dataIndex: 'video_id',
      key: 'video_id',
      width: 30,
    },{
      title: '顶部广告',
      dataIndex: 'ad_top_show',
      key: 'ad_top_show',
      width: 30,
      render:(v)=>v?<Icon type="check" />:<Icon type="cross" />
    },{
      title: '底部广告',
      dataIndex: 'ad_bottom_show',
      key: 'ad_bottom_show',
      width: 30,
      render:(v)=>v?<Icon type="check" />:<Icon type="cross" />
    },{
      title: '作者广告',
      dataIndex: 'ad_author_show',
      key: 'ad_author_show',
      width: 30,
      render:(v)=>v?<Icon type="check" />:<Icon type="cross" />
    },{
      title: '原文广告',
      dataIndex: 'ad_original_show',
      key: 'ad_original_show',
      width: 30,
      render:(v)=>v?<Icon type="check" />:<Icon type="cross" />
    },{
      title: '返回广告',
      dataIndex: 'ad_back_show',
      key: 'ad_back_show',
      width: 30,
      render:(v)=>v?<Icon type="check" />:<Icon type="cross" />
    },{
      title: '分享次数',
      dataIndex: 'share_times',
      key: 'share_times',
      width: 30,
    },{
      title: '发布',
      dataIndex: 'published',
      key: 'published',
      width: 30,
      render:(v)=>v?<Icon type="play-circle" style= {{color:'#08c'}} />:<Icon type="cross" />
    },{
      title: '配置',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '发布' },{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
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
  onPublishItem:PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
