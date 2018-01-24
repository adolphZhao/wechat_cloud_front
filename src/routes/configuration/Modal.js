import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
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
        <FormItem label="分享时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('stop_time', {
            initialValue: item.stop_time,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber min={1} max={300} />)}
        </FormItem>
        <FormItem label="分享标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('titles', {
            initialValue: item.config&&item.config.map(v=>v.title).join('\n'),
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea placeholder="输入分享标题，每行一条标题" autosize={{ minRows: 4, maxRows: 6 }}  />)}
        </FormItem>
        <FormItem label="分享图片" hasFeedback {...formItemLayout}>
          {getFieldDecorator('images', {
            initialValue: item.config&&item.config.map(v=>v.image).join('\n'),
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea placeholder="输入分享图片，每行一个图片地址" autosize={{ minRows: 4, maxRows: 6 }}  />)}
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
