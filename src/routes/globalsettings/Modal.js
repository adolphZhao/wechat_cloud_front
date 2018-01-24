import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
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
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
          })(<Input />)}
        </FormItem>
        <FormItem label="图片" hasFeedback {...formItemLayout}>
          {getFieldDecorator('image', {
            initialValue: item.image,
          })(<Input />)}
        </FormItem>
        <FormItem label="地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: item.url,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="位置" hasFeedback {...formItemLayout}>
          {getFieldDecorator('position', {
            initialValue: item.position,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>顶部广告</Radio>
              <Radio value={2}>底部广告</Radio>
              <Radio value={3}>作者链接</Radio>
              <Radio value={4}>返回链接</Radio>
            </Radio.Group>
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
