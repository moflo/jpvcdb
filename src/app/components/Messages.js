import * as React from 'react'
import Link from 'next/link'
import { Layout, Breadcrumb, Button, Table, Modal } from 'antd';
import styled from 'styled-components';
import DBQueryProvider from './DBQueryProvider';


const { Content } = Layout;


export default class MFMessages extends React.Component {
  state = {
    deploying: false,
    menuVisible: false,
    loading: false,
    record: {}
  }

  handleShowMenu = () => {
    console.log("handleShowMenu")
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

  handleEdit = (e,record) => {
    this.setState({
      record,
      menuVisible: true
    })
  }

  onRowSelect = record => {
    console.log("Select record ", record)
  }
  
  render() {
    const { deploying, loading, record } = this.state;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'peoblem',
    }, {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: ((text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>),
    }, {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    }, {
      title: 'Actions',
      // dataIndex: 'databaseURL',
      key: 'edit',
      render: ((text,record) => <Button.Group type="small" ><Button icon="edit" onClick={(e) => {this.handleEdit(e,record)} }/><Button icon="delete" /></Button.Group> ),
  }];


    return (
      <Content style={{ margin: '0 16px' }}>

        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Messages</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <div style={{textAlign: 'right'}} >
        <Button type="secondary" size="large" icon="plus" onClick={this.handleShowMenu}> Add Message </Button>
        </div>
        
          <DBQueryProvider path={'messages'} >

          { ({error, isLoading, data}) => {
          
            if (error) { console.error("Error loading users ", error)}

            return(
                <Table 
                columns={columns} 
                dataSource={data} 
                rowKey={record => record.id}
                onRow={(record) => ({
                  onClick: () => { this.onRowSelect(record); }
                })}
                loading={isLoading} 
                pagination={true} />
            )
          }}

          </DBQueryProvider>

        </div>
        <Modal
          width={"80%"}
          title="New Message"
          visible={this.state.menuVisible}
          onCancel={this.handleHideMenu}
          footer={[
            <Button key="back" onClick={this.handleHideMenu}>Cancel</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Table columns={columns} rowKey="uid2" dataSource={[record]} pagination={false} />

        </Modal>
      </Content>
      )

  }

}