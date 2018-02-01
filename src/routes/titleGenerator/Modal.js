import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Select,Switch } from 'antd'
import city from '../../utils/city'

const {TextArea} = Input;
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

  const handleChange = (id)=>{
    if(item.videos){
      item.template = item.videos.filter(v=>v.id==id).map(v=>v.template).join('');
      item.video_code = item.videos.filter(v=>v.id==id).map(v=>v.code).join('');
    }
  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
      <FormItem label="视频编码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('video_code', {
          initialValue: item.video_code,
        })(<Input disabled={true} />)}
      </FormItem>
        <FormItem label="标题模板" hasFeedback {...formItemLayout}>
          {getFieldDecorator('template', {
            initialValue: item.template,
          })(<Input disabled={true} />)}
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
             onChange={handleChange}
             style={{ width: 200 }}
             placeholder="选择一个视频"
             optionFilterProp="children"
             filterOption={(input, option) =>{return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} }
           >
             {item.videos&&item.videos.map(v=> <Select.Option key={v.code} value={v.id.toString()} >{v.code}</Select.Option>)}
           </Select>
          )}
        </FormItem>
        <FormItem label="前缀" hasFeedback {...formItemLayout}>
          {getFieldDecorator('prefix', {
              initialValue: item.prefix,
            })(<TextArea autosize={{ minRows: 3, maxRows: 6 }} />)}
        </FormItem>
        <FormItem label="核心词" hasFeedback {...formItemLayout}>
          {getFieldDecorator('core', {
              initialValue: item.core,
            })(<TextArea autosize={{ minRows: 3, maxRows: 6 }} />)}
        </FormItem>
        <FormItem label="后缀" hasFeedback {...formItemLayout}>
          {getFieldDecorator('suffix', {
            initialValue: item.suffix,
          })( <TextArea autosize={{ minRows: 3, maxRows: 6 }} />)}
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
