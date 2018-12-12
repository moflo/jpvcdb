import * as React from 'react'
import Link from 'next/link'
import { Layout, Breadcrumb, Button, Table, Modal, Card, Form, Input, Icon, notification } from 'antd';
import styled from 'styled-components';
import firebaseConfig from '../credentials/client';


const { Content } = Layout;
const FormItem  = Form.Item;

class PostCreate extends React.Component {
  state = {
    deploying: false,
    menuVisible: false,
    loading: false
  }

  handleOk = () => {
    this.setState({
      menuVisible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {history} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("title:", values.title)
        console.log("body:", values.body)
        this.setState({
          menuVisible: false,
        });
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
      <Content>
        <Button key="back" size="large" icon="arrow-left" onClick={this.props.cancelCallback} style={{ marginBottom: 16}} >Cancel</Button>

        <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
        <Card title="New Post" bordered={false} style={{ width: "100%"}} loading={false} >
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="Title">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input a title!' }],
                  })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" New Post" />
                  )}
                </FormItem>
                <FormItem label="Message">
                  {getFieldDecorator('body', {
                    rules: [{ required: true, message: 'Please input your message!' }],
                  })(
                    <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder=" Message..." />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" style={{ marginTop: 16}} >
                    Save
                  </Button>
                </FormItem>
              </Form>
          </Card>
        </div>
      </Content>
      )
  }
}

export default class MFPosts extends React.Component {
  state = {
    deploying: false,
    menuVisible: false,
    loading: false
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }

  handleOk = () => {
    this.setState({
      menuVisible: false,
    });
  }

  render() {
    const { deploying, loading } = this.state;
    const WrappedPostCreate = Form.create()(PostCreate);

    const columns = [{
      title: 'Project ID',
      dataIndex: 'projectId',
      key: 'projectId',
    }, {
      title: 'Auth Domain',
      dataIndex: 'authDomain',
      key: 'authDomain',
    }, {
      title: 'Storage Bucket',
      dataIndex: 'storageBucket',
      key: 'storageBucket',
    }, {
      title: 'Database URL',
      dataIndex: 'databaseURL',
      key: 'databaseURL',
      render: ((text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>),
    }, {
      title: 'Actions',
      // dataIndex: 'databaseURL',
      key: 'edit',
      render: ((text,record) => <Button.Group type="small" ><Button icon="edit" /><Button icon="delete" /></Button.Group> ),
  }];

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Post</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.menuVisible ?
         <WrappedPostCreate cancelCallback={this.handleHideMenu} />
        :
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        
          <div style={{textAlign: 'right'}} >
          <Button type="secondary" size="large" icon="plus" onClick={this.handleShowMenu}> New Post </Button>
          </div>
          
          <Table columns={columns} rowKey="uid1" dataSource={[firebaseConfig]} pagination={false} />
        </div>
        }
      </Content>
      )

  }

}