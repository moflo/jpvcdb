import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Table, Tag } from 'antd';
import DBQueryProvider from '../components/DBQueryProvider';
import styled from 'styled-components';
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map.js'), {
  ssr: false
});

const Page2Container = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;

  .ant-table {
    font-size: 16px;
    background: #fff;
    padding: 0px;
    border-color: #fff;
  }

  .ant-table-row {
    height: 18px;
    background: #fff;
    padding: 0px;
    border-color: #fff;
    border-bottom-color: #f00;
  }

`

const PageHeader = styled.h1`
    text-align: center;
`

export default function Page2({ isMobile }) {

  const DemoBox = props => <Card title={`${props.title}`}>{props.children}</Card>;

  const columnsCount = [{
    title: 'Batch',
    dataIndex: 'batch',
    key: 'key',
  }, {
    title: 'Count',
    key: 'count',
    dataIndex: 'count',
    render: (text, record) => (
      <span>
        <Tag color={'#f06633'} key='c' style={{width: record.percent+"%"}}>{record.count}</Tag>
      </span>
    ),
  }];

  const columnsStatus = [{
    title: 'Batch',
    dataIndex: 'batch',
    key: 'key',
  }, {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => (
      <span>
        <Tag color={'#007bff'} key={1} style={{width: (66*record.exited/record.count)+"%"}}>{record.exited}</Tag>
        <Tag color={'#b8daff'} key={2} style={{width: (66*record.live/record.count)+"%"}}>{record.live}</Tag>
        <Tag color={'#f06633'} key={3} style={{width: (66*record.dead/record.count)+"%"}}>{record.dead}</Tag>
      </span>
    ),
  }];


  const columnsFunding = [{
    title: 'Batch',
    dataIndex: 'batch',
    key: 'key',
  }, {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => (
      <span>
        <Tag color={'#007bff'} key={1} style={{width: (55*record.mega/record.count)+"%"}}>{record.mega}</Tag>
        <Tag color={'#b8daff'} key={2} style={{width: (55*record.mini/record.count)+"%"}}>{record.mini}</Tag>
        <Tag color={'#f06633'} key={3} style={{width: (55*record.seed/record.count)+"%"}}>{record.seed}</Tag>
        <Tag color={'#eeeee'} key={4} style={{width: (55*record.none/record.count)+"%"}}>{record.none}</Tag>
      </span>
    ),
  }];


  const batchData = [
    {batch: "2007", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 1, none: 0},
    {batch: "2008", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 0, sead: 2, none: 0},
    {batch: "2009", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2010", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2011", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2012", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2013", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2014", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2015", count: 4, percent: 0.5, exited: 2, live: 0, dead: 2, mega: 1, mini: 2, sead: 0, none: 0},
    {batch: "2016", count: 4, percent: 0.5, exited: 0, live: 3, dead: 1, mega: 0, mini: 2, sead: 1, none: 1},
    {batch: "2017", count: 4, percent: 0.5, exited: 0, live: 4, dead: 0, mega: 0, mini: 2, sead: 2, none: 0},
    {batch: "2018", count: 4, percent: 0.5, exited: 0, live: 4, dead: 0, mega: 1, mini: 2, sead: 1, none: 0} 
  ]


  const onRowSelect = record => {
    // console.log("Select record ", record)
    // redirect('/cohort/testing','/cohort?id=testing')
    Router.push('/cohort?id=W18','/cohort/W18')
  }


  return (
    <Page2Container>
      <PageHeader>Cohort Analysis</PageHeader> 

              <Row type="flex" justify="space-around" align="top">
                <Col span={7}>
                  <h2>Funding by Cohort</h2>
                  <Table
                    columns={columnsFunding} 
                    dataSource={batchData} 
                    onRow={(record) => ({ onClick: () => { onRowSelect(record); } })}
                    showHeader={false} 
                    size="small" 
                    pagination={false} 
                    bordered={false}
                    // loading={isLoading} 
                    />
                </Col>
                <Col span={7}>
                    <h2>Status Outcome by Cohort</h2>
                    <Table 
                    columns={columnsStatus} 
                    dataSource={batchData} 
                      onRow={(record) => ({ onClick: () => { onRowSelect(record); } })}
                      showHeader={false} 
                      size="small" 
                      pagination={false} 
                      bordered={false}
                      // loading={isLoading} 
                      />
                </Col>
                <Col span={7}>
                  <DemoBox title="HQ Location">
                    <Map />
                  </DemoBox>
                </Col>
              </Row>

    </Page2Container>
    );
}
Page2.propTypes = {
  isMobile: PropTypes.bool,
};