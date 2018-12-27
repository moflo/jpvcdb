import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { Tabs, Row, Col, Table, Tag, Icon } from 'antd';
import FirebaseProvider from '../lib/FirebaseProvider';
import styled from 'styled-components';

const Page3Container = styled.div`
  margin-top: 30px;
  padding-bottom: 20px;
  background-color: #f8f9fa;

  .ant-tabs-left > .ant-tabs-bar .ant-tabs-tab {
    text-align: left;
    height: 18px;
  }
`
const PageHeader = styled.h1`
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
  `


export default function Page3({ isMobile, batch }) {

    const onRowSelect = record => {
        console.log("Select record ", record)
      }
    
    const colorForStatus = status => {
        if (status.match(/live/i)) return "#ffc108" // yellow
        if (status.match(/dead/i)) return "#dc3545" // red
        if (status.match(/exit/i)) return "#28a745"  // green
        return "gray"
    }

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: ((text,record) => <Link href={`/company?id=`+record.id} as={`/company/`+record.id}><a>{text}</a></Link>),
    }, {
        title: 'Batch',
        dataIndex: 'batch',
        key: 'batch'
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
     }, {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
     }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: ((tag) => <Tag color={colorForStatus(tag)} key={tag} >{tag.toUpperCase()}</Tag>)
    }];
  
    const batchFilter = batch || 'W18'

    var filter = ['batch', '==', batchFilter]

    const TabPane = Tabs.TabPane

    const QueryFilterTable = category => {
        var categoryFilter = filter
        if (category != "All") {
            categoryFilter = [filter,['category', '==', category]]
        }
        return (
        <FirebaseProvider path={'companies'} filter={categoryFilter} sort="name">

        { ({error, isLoading, data}) => {

        if (error) { console.error("Error loading users ", error)}

        return(
            <Table 
            columns={columns} 
            dataSource={data} 
            rowKey={record => record.id}
            onRow={(record) => ({
                onClick: () => { onRowSelect(record); }
            })}
            loading={isLoading} 
            pagination={true} />
        )
        }}

        </FirebaseProvider>
        )
    }

  return (
    <Page3Container>
      <PageHeader>Recent Investment Cohort {batchFilter}</PageHeader> 
      <Row type="flex" justify="space-around" align="middle">
        <Col span={18}>

        <Tabs className="home-cohort-tabs"
          defaultActiveKey="1"
          tabPosition="left"
          tabBarStyle={{ color: "#4d4d4d", backgroundColor: "#f8f9fa", paddingTop: 0, paddingBottom: 0 }}
        //   style={{ height: 220 }}
          size="small"
        >
          <TabPane tab={<span><Icon type="home" />All</span>} key="1">
            {QueryFilterTable("All")}
            </TabPane>

            <TabPane tab={<span><Icon type="rocket" />Aerospace</span>} key="2">
            {QueryFilterTable("Aerospace")}
            </TabPane>

            <TabPane tab={<span><Icon type="compass" />Agriculture</span>} key="3">
            {QueryFilterTable("Agriculture")}
            </TabPane>

            <TabPane tab={<span><Icon type="setting" />AI and ML</span>} key="4">
            {QueryFilterTable("AI and ML")}
            </TabPane>

            <TabPane tab={<span><Icon type="link" />Blockchain</span>} key="5">
            {QueryFilterTable("Blockchain")}
            </TabPane>

            <TabPane tab={<span><Icon type="user" />Consumer</span>} key="6">
            {QueryFilterTable("Consumer")}
            </TabPane>

            <TabPane tab={<span><Icon type="tool" />Dev Tools</span>} key="7">
            {QueryFilterTable("Dev Tools")}
            </TabPane>

            <TabPane tab={<span><Icon type="edit" />Education</span>} key="8">
            {QueryFilterTable("Education")}
            </TabPane>

            <TabPane tab={<span><Icon type="video-camera" />Entertainment</span>} key="9">
            {QueryFilterTable("Entertainment")}
            </TabPane>

            <TabPane tab={<span><Icon type="bank" />Fintech</span>} key="10">
            {QueryFilterTable("Fintech")}
            </TabPane>

            <TabPane tab={<span><Icon type="pound" />Government</span>} key="11">
            {QueryFilterTable("Government")}
            </TabPane>

            <TabPane tab={<span><Icon type="medicine-box" />Healthcare</span>} key="12">
            {QueryFilterTable("Healthcare")}
            </TabPane>

            <TabPane tab={<span><Icon type="experiment" />Industrial</span>} key="13">
            {QueryFilterTable("Industrial")}
            </TabPane>

            <TabPane tab={<span><Icon type="shop" />Real Estate</span>} key="14">
            {QueryFilterTable("Real Estate")}
            </TabPane>

            <TabPane tab={<span><Icon type="crown" />Resources</span>} key="15">
            {QueryFilterTable("Resources")}
            </TabPane>

            <TabPane tab={<span><Icon type="car" />Transport</span>} key="16">
            {QueryFilterTable("Transport")}
            </TabPane>

            <TabPane tab={<span><Icon type="cloud" />Other SaaS</span>} key="17">
            {QueryFilterTable("Other SaaS")}
            </TabPane>

            <TabPane tab={<span><Icon type="team" />Nonprofit</span>} key="18">
            {QueryFilterTable("Nonprofit")}
            </TabPane>

            </Tabs>
            
        </Col>
      </Row>
    </Page3Container>
    );
}
Page3.propTypes = {
  isMobile: PropTypes.bool,
};