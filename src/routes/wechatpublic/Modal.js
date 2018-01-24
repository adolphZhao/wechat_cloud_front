import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const {TextArea} = Input

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
        <FormItem label="标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
          })(<Input />)}
        </FormItem>
        <FormItem label="APPID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('app_id', {
            initialValue: item.app_id,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="APPSECRET" hasFeedback {...formItemLayout}>
          {getFieldDecorator('app_secret', {
            initialValue: item.app_secret,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="绑定URL" hasFeedback {...formItemLayout}>
          {getFieldDecorator('bind_url', {
            initialValue: item.config&&item.config.map(v=>v.bind_url).join('\n'),
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea placeholder="输入微信绑定的url，每行一个绑定的url" autosize={{ minRows: 3, maxRows: 6 }} />)}
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
