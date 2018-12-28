import * as React from 'react'
import Link from 'next/link'
import { Layout, Breadcrumb, Avatar, Table } from 'antd';
import styled from 'styled-components';
import FirebaseProvider from '../lib/FirebaseProvider';

const { Content } = Layout;


export default class MFUsers extends React.Component {
  state = {
    deploying: false,
  }

onRowSelect = record => {
  console.log("Select record ", record)
}

render() {
  const { deploying } = this.state;

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'User ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Avatar URL',
    dataIndex: 'avatarURL',
    key: 'avatarURL',
    render: ((text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>),
  }];


  return (
    <Content style={{ margin: '0 16px' }}>

      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>

      <FirebaseProvider path={'users'} >

      { ({error, isLoading, data}) => {
      
        if (error) { console.error("Error loading users ", error)}

        return(
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Table 
            columns={columns} 
            dataSource={data} 
            rowKey={record => record.id}
            onRow={(record) => ({
              onClick: () => { this.onRowSelect(record); }
            })}
            loading={isLoading} 
            pagination={true} />
          </div>
        )
      }}

      </FirebaseProvider>
    </Content>
    )

  }

}