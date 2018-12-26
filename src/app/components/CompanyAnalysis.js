import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Progress, Icon, Tabs } from 'antd';
import styled from 'styled-components';

const AnalysisContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f9fa;
 .ant-tabs-card > .ant-tabs-content {
    margin-top: -16px;
  }
  
  .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
      background: #fff;
      padding: 16px;
    }
    
  .ant-tabs-card > .ant-tabs-bar {
      border-color: #fff;
    }
    
  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
      border-color: transparent;
      background: transparent;
    }
    
  .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
      border-color: #fff;
      background: #fff;
    }
  
  .ant-progress {
    padding-top: 10px;
  }

  .ant-card-head {
    background: #F3F3F3;
  }
`

const PageHeader = styled.h2`
    padding-bottom: 30px;
`

const TabPane = Tabs.TabPane

export default function Analysis({ isMobile, performance }) {

  const perf = performance || {"funding":5.2204930393039,"fundingCat":100,"alexa":52.23,"alexaCat":52.22,"twitter":3.0,"twitterCat":100,"employees":11.2,"employeesCat":42.0,"growth":22.1,"growthCat":82.44};
  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }

  const RankingBox = props => (
    <Card hoverable={true} 
          title={props.title}
          extra={<Icon type={props.icon}></Icon>} 
          onClick={(e) => { onCardSelect(e,props) } }
          >
    {props.info}
    <Progress percent={props.percent} status="active" />
    </Card>
    )

  const pt = number => number != null ? (number + 0.049999999).toFixed(1) : 0.0   // Round up to 0.1

  return (
    <AnalysisContainer>
      <PageHeader>Company Analysis</PageHeader> 
      <Tabs
          defaultActiveKey="1"
          type="card"
          // tabBarStyle={{ color: "#00f", backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }}
        >
          <TabPane tab={<span><Icon type="home" />Performance vs. Cohort</span>} key="1">

          <Row type="flex" justify="space-around" align="top">
            <Col span={10}><RankingBox title="Funding" percent={pt(perf.funding)} info="Investment funding compared to cohort" link="funding" icon="red-envelope">Funding</RankingBox></Col>
            <Col span={10}><RankingBox title="Exits" percent={pt(perf.exit)} info="Exit value compared to cohort" link="exit" icon="rocket">Exit</RankingBox></Col>
          </Row>
          <br />
          <Row type="flex" justify="space-around" align="top">
            <Col span={10}><RankingBox title="Employees" percent={pt(perf.employees)} info="Employee count compared to cohort" link="employees" icon="smile">Employees</RankingBox></Col>
            <Col span={10}><RankingBox title="Alexa Rank" percent={pt(perf.alexa)} info="Alexa rank compared to cohort" link="alexa" icon="compass">Alexa</RankingBox></Col>
          </Row>

          </TabPane>

          <TabPane tab={<span><Icon type="home" />vs. Sector</span>} key="2">

          <Row type="flex" justify="space-around" align="top">
            <Col span={10}><RankingBox title="Funding" percent={pt(perf.fundingCat)} info="Investment funding within same category" link="funding" icon="red-envelope">Funding</RankingBox></Col>
            <Col span={10}><RankingBox title="Exits" percent={pt(perf.exitCat)} info="Exit value within same category" link="exit" icon="rocket">Exit</RankingBox></Col>
          </Row>
          <br />
          <Row type="flex" justify="space-around" align="top">
            <Col span={10}><RankingBox title="Employees" percent={pt(perf.employeesCat)} info="Employee count within same category" link="employees" icon="smile">Employees</RankingBox></Col>
            <Col span={10}><RankingBox title="Alexa Rank" percent={pt(perf.alexaCat)} info="Alexa rank within same category" link="alexa" icon="compass">Alexa</RankingBox></Col>
          </Row>

          </TabPane>

      </Tabs>
    </AnalysisContainer>
    );
}
Analysis.propTypes = {
  isMobile: PropTypes.bool,
  performance: PropTypes.object
};