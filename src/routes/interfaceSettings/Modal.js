import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const onChange = (e)=>{

  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
          })(<Input />)}
        </FormItem>
        <FormItem label="视频" hasFeedback {...formItemLayout}>
          {getFieldDecorator('video_id', {
            initialValue: item.video_id&&item.video_id.toString(),
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
             showSearch
             style={{ width: 200 }}
             placeholder="选择一个视频"
             optionFilterProp="children"
             filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           >
             {item.videos&&item.videos.map(v=> <Select.Option key={v.code} value={v.id.toString()} >{v.code}</Select.Option>)}
           </Select>
          )}
        </FormItem>
        <FormItem label="视频顶部广告" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ad_top_show', {
              initialValue: item.ad_top_show,
            })(<Switch checkedChildren="顶部" unCheckedChildren="顶部"  defaultChecked={item.ad_top_show} />)}
        </FormItem>
        <FormItem label="视频底部广告" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ad_bottom_show', {
            initialValue: item.ad_bottom_show,
          })(<Switch checkedChildren="底部" unCheckedChildren="底部" defaultChecked={item.ad_bottom_show} />)}
        </FormItem>
        <FormItem label="作者链接广告" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ad_author_show', {
            initialValue: item.ad_author_show,
          })( <Switch  checkedChildren="作者" unCheckedChildren="作者" defaultChecked={item.ad_author_show}/>)}
        </FormItem>
        <FormItem label="原文链接广告" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ad_original_show', {
            initialValue: item.ad_original_show,
          })( <Switch  checkedChildren="原文" unCheckedChildren="原文" defaultChecked={item.ad_original_show}/>)}
        </FormItem>
        <FormItem label="返回链接广告" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ad_back_show', {
            initialValue: item.ad_back_show,
          })( <Switch  checkedChildren="返回" unCheckedChildren="返回" defaultChecked={item.ad_back_show}/>)}
        </FormItem>
        <FormItem label="分享次数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('share_times', {
            initialValue: item.share_times ||3,
            rules: [
              {
                required: true,
                type:'number',
              },
            ],
          })(
              <InputNumber  min={0} max={6} />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
