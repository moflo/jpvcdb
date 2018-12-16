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
  const onRowSelect = record => {
    // console.log("Select record ", record)
    // redirect('/cohort/testing','/cohort?id=testing')
    Router.push('/cohort?id=W18','/cohort/W18')
  }


  return (
    <Page2Container>
      <PageHeader>Cohort Analysis</PageHeader> 

      <DBQueryProvider path={'companies'} /*limit={10000}*/ sort="name">

        { ({error, isLoading, data}) => {

          // console.log(JSON.stringify(data))


          let batches = data.map( co => co.batch )

          let sortedBatches = [ ...new Set(batches)].sort((a,b) => parseInt(a.replace(/[ws]/i,'')) - parseInt(b.replace(/[ws]/i,'')))

          const totalFunding = (d, b) => d.filter( co => co.batch == b).reduce( (funding,co) => funding + co.funding, 0)

          var sortedFunding = sortedBatches.map( batch => totalFunding(data, batch) )

          const totalCompanies = (d, b) => d.filter( co => co.batch == b).length

          var sortedCount = sortedBatches.map( batch => totalCompanies(data, batch) )

          const totalStatus = (d,b,s) => d.filter( co => co.batch == b && co.status == s).length

          var sortedLive = sortedBatches.map( batch => totalStatus(data, batch, 'Live') )
          var sortedExited = sortedBatches.map( batch => totalStatus(data, batch, 'Exited') )
          var sortedDead = sortedBatches.map( batch => totalStatus(data, batch, 'Dead') )

          const totalLevel = (d,b,min,max) => d.filter( co => co.batch == b && co.funding > min && co.funding <= max).length

          var sortedMega = sortedBatches.map( batch => totalLevel(data, batch, 10.0, 99999999.0) )
          var sortedMini = sortedBatches.map( batch => totalLevel(data, batch, 5.0, 10.0) )
          var sortedSeed = sortedBatches.map( batch => totalLevel(data, batch, 0.0, 5.0) )
          var sortedNone = sortedBatches.map( batch => totalLevel(data, batch, -1.0, 0.0) )

          // Calcluate batch count

          var batchCountData = []

          let maxBatchCount = Math.max(...sortedCount)    // batch match

          for (var [i,b] of sortedBatches.entries()) {
              // console.log(`i: ${i} = ${b}, ${sortedCount[i]}`)
              let percent = maxBatchCount != 0 ? sortedCount[i] / maxBatchCount : 1.0
              var dataObj = {batch: b, count: sortedCount[i], percent: percent * 100.0}
              batchCountData.push(dataObj)
          }

          // Calculate batch status

          var batchStatusData = []

          for (var [i,b] of sortedBatches.entries()) {
              // console.log(`i: ${i} = ${b}, ${sortedCount[i]}`)
              let live = sortedLive[i]
              let dead = sortedDead[i]
              let exited = sortedExited[i]
              var dataObj = {batch: b, count: sortedCount[i], exited, live, dead}
              batchStatusData.push(dataObj)
          }

          // Calculate batch funding levels

          var batchFundingData = []

          for (var [i,b] of sortedBatches.entries()) {
              // console.log(`i: ${i} = ${b}, ${sortedCount[i]}`)
              let mega = sortedMega[i]
              let mini = sortedMini[i]
              let seed = sortedSeed[i]
              let none = sortedNone[i]
              var dataObj = {batch: b, count: sortedCount[i], mega, mini, seed, none}
              batchFundingData.push(dataObj)
          }


          return (
              <Row type="flex" justify="space-around" align="top">
                <Col span={5}>
                  <h2>Funding by Cohort</h2>
                  <Table
                    columns={columnsFunding} 
                    dataSource={batchFundingData} 
                    onRow={(record) => ({ onClick: () => { onRowSelect(record); } })}
                    showHeader={false} 
                    size="small" 
                    pagination={false} 
                    bordered={false}
                    loading={isLoading} 
                    />
                </Col>
                <Col span={5}>
                    <h2>Status Outcome by Cohort</h2>
                    <Table 
                    columns={columnsStatus} 
                    dataSource={batchStatusData} 
                      onRow={(record) => ({ onClick: () => { onRowSelect(record); } })}
                      showHeader={false} 
                      size="small" 
                      pagination={false} 
                      bordered={false}
                      loading={isLoading} 
                      />
                </Col>
                <Col span={5}><DemoBox title="HQ Location">
                  <Map />
                  </DemoBox>
                </Col>
              </Row>
              )
        }}
      </DBQueryProvider>
    </Page2Container>
    );
}
Page2.propTypes = {
  isMobile: PropTypes.bool,
};