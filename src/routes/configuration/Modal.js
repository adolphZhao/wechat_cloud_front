import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Text } from 'antd'
import city from '../../utils/city'

const { TextArea } = Input

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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="视频编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="映射id" hasFeedback {...formItemLayout}>
          {getFieldDecorator('map_id', {
            initialValue: item.map_id,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="分享时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('stop_time', {
            initialValue: item.stop_time,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber min={1} max={600} />)}
        </FormItem>
        <FormItem label="分享权重" hasFeedback {...formItemLayout}>
          {getFieldDecorator('weight', {
            initialValue: item.weight||0,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber min={1} max={999} />)}
        </FormItem>
        <FormItem label="标题模板" hasFeedback {...formItemLayout}>
          {getFieldDecorator('template', {
            initialValue: item.template,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder='****{prefix}****{core}****{suffix}****...' />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
}

export default Form.create()(modal)
