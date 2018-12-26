import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Row, Col, Icon, Form, Button, Input, Radio, Rate, notification } from 'antd';
import styled from 'styled-components';
import createMessage from '../lib/createMessage'

const FormItem  = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const FeedbackContainer = styled.div`
  padding: 30px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`

const PageHeader = styled.h2`
    padding-bottom: 30px;
`

class MessageCreate extends React.Component {
    state = {
      id: this.props.id || 'unknown',
      deploying: false,
      submitVisible: true,
      loading: false
    }
  
    handleOk = () => {
      this.setState({
        submitVisible: false,
      });
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      const {history} = this.props;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log("title:", values.title)
          console.log("body:", values.body)

          let message = { company: this.state.id, 
                        name: values.name, 
                        email: values.email, 
                        message: values.message, 
                        problem: values.problem, 
                        rating: values.rating}

          createMessage(message)
          .then( (resp) => {
            
            if (resp) {
                notification.info({
                    message: "Message Sent!",
                    description: `Thank you ${values.name}. We recieved your message.`
                })
        
                this.props.form.resetFields()
        
                this.setState({
                    submitVisible: false
                });
    
            }
          })
             
        }
        else {
          var errorCode = err.code || 'Sorry, there was a problem.';
          var errorMessage = err.message || 'Please correct the errors and submit again'
  
          notification.error({
            message: errorCode,
            description: errorMessage
          })
        }
      })
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { deploying, loading } = this.state;
  
      return (
            <Form onSubmit={this.handleSubmit}>
            <Row gutter={40}>
                    <Col span={12}>

                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please tell us who you are.' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Your Name" />
                        )}
                        </FormItem>

                        <FormItem label="Email">
                        {getFieldDecorator('email', {
                            rules: [{type: 'email', message: 'The input is not valid E-mail!'},
                                { required: true, message: 'Please tell us how to contact you.' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Your Email" />
                        )}
                        </FormItem>

                        <FormItem label="Problem Type">
                        {getFieldDecorator('problem', {
                            rules: [{ required: true, message: 'Please explain the problem' }],
                        })(
                            <RadioGroup>
                            <RadioButton value="bug">Bug</RadioButton>
                            <RadioButton value="data">Bad Data</RadioButton>
                            <RadioButton value="question">Question</RadioButton>
                          </RadioGroup>
                        )}
                        </FormItem>

                    </Col>
                    <Col span={12}>


                        <FormItem label="Message">
                        {getFieldDecorator('message', {
                            rules: [{ required: true, message: 'Please input your message!' }],
                        })(
                            <TextArea rows={4} prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder=" Message..." />
                        )}
                        </FormItem>

                        <FormItem label="Rating" >
                        <p>How you feel about this website?</p>
                            {getFieldDecorator('rating')(
                                <Rate style={{ color: "#ed2939"}} />
                            )}
                        </FormItem>

                    </Col>
                    <Col span={24}>

                    <FormItem>
                        <Button disabled={!this.state.submitVisible} htmlType="submit" style={{ width: "100%", marginTop: 16, backgroundColor: "#000", color: "#fff", borderColor: "#000"}} >
                        Submit
                        </Button>
                    </FormItem>                

                    </Col>
                </Row>

            </Form>
        )
    }
  }

export default function Feedback({ isMobile, companyID }) {

  const WrappedMessageCreate = Form.create()(MessageCreate);

  return (
    <FeedbackContainer>
      <PageHeader>Feedback</PageHeader> 
        <WrappedMessageCreate id={companyID}/>
    </FeedbackContainer>
    );
}
Feedback.propTypes = {
  isMobile: PropTypes.bool,
  companyID: PropTypes.string
};