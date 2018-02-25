import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,  Modal } from 'antd'

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

  const ipaddress =item.list&&item.list.filter((v)=>{
    if(v.status==0){
      return true;
    }
  }).map(v=>"'"+v.ip_address+"'").join(',');


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="统计负载IP" hasFeedback {...formItemLayout}>
          {getFieldDecorator('guide', {
            initialValue:  "angular.forEach(angular.element('.table-hover').scope().store, function(row){row.selected = [" + ipaddress + "].indexOf(row.Address) == -1;})",
          })(<TextArea autosize={{minRows:6,maxRows:6}}/>)}
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
