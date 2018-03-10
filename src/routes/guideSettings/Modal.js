import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio, Modal,Select } from 'antd'
import city from '../../utils/city'

const Option = Select.Option;
const FormItem = Form.Item

const guideTime=[];

for (let i = 1; i < 10; i++) {
  guideTime.push(<Option key={i}>{i}</Option>);
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item ={},
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

  }

  return (
    <Modal {...modalOpts} >
      <Form layout="horizontal">
        <FormItem label="导流分组" hasFeedback {...formItemLayout}>
          {getFieldDecorator('domain', {
            initialValue: item.relation.map(v=>v.domain),
            rules: [
              {
                required: true,
              },
            ]
          })(<Select
          mode="multiple"
          size='default'
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {item.domain.map((v=>(<Option key={v.domain}>{v.domain+'('+v.hits+')'}</Option>)))}
        </Select>)}
        </FormItem>
        <FormItem label="导流时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('guide_time', {
            initialValue: item.guide_time,
            rules: [
              {
                required: true,
              },
            ]
          })(<Select
            size='default'
            onChange={handleChange}
            style={{ width: 200 }}
          >
            {guideTime}
          </Select>)}
        <label>（小时）</label>
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
