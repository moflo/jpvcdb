import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Icon } from 'antd';
import styled from 'styled-components';

const Page1Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #f8f9fa;
`
const PageHeader = styled.h1`
    text-align: center;
    padding-bottom: 30px;
`


export default function Page1({ isMobile }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }

  const DemoMeta = props => (
  <Card hoverable={true} 
    onClick={(e) => { onCardSelect(e,props) } }
    >
    <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={props.title}
        description={props.info}
    />
  </Card>
  )

  const DemoMetaAction = props => (
  <Card actions={[<Icon type="table">Details</Icon>]} hoverable={true} onClick={(e) => { onCardSelect(e,props) } }>
    <Meta avatar={<Icon type={props.icon} />}
        title={props.title}
        description={props.info}
    />
  </Card>
  )

  const DemoBox = props => (
  <Card hoverable={true} 
        title={props.title} 
        onClick={(e) => { onCardSelect(e,props) } }
        >
  {props.info}
  </Card>
  )

  return (
    <Page1Container>
      <PageHeader>Top 100 Ranking</PageHeader> 
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoMeta title="Top Funded" info="Top 100 companies by funding" link="funding" icon="pay-circle">Funding</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Top Exits" info="Top 100 companies by exit" link="exit" icon="rocket">Exit</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Top Employers" info="Top 100 companies by employees" link="employees" icon="team">Employees</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Top Alexa" info="Top 100 companies by Alexa rank" link="alexa" icon="compass">Alexa</DemoMeta></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoMetaAction title="Top Funded" info="Top 100 companies by funding" link="funding" icon="pay-circle">Funding</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Top Exits" info="Top 100 companies by exit" link="exit" icon="rocket">Exit</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Top Employers" info="Top 100 companies by employees" link="employees" icon="team">Employees</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Top Alexa" info="Top 100 companies by Alexa rank" link="alexa" icon="compass">Alexa</DemoMetaAction></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
      <Col span={4}><DemoBox title="Top Funded" info="Top 100 companies by funding" link="funding" icon="pay-circle">Funding</DemoBox></Col>
        <Col span={4}><DemoBox title="Top Exits" info="Top 100 companies by exit" link="exit" icon="rocket">Exit</DemoBox></Col>
        <Col span={4}><DemoBox title="Top Employers" info="Top 100 companies by employees" link="employees" icon="team">Employees</DemoBox></Col>
        <Col span={4}><DemoBox title="Top Alexa" info="Top 100 companies by Alexa rank" link="alexa" icon="compass">Alexa</DemoBox></Col>
      </Row>
    </Page1Container>
    );
}
Page1.propTypes = {
  isMobile: PropTypes.bool,
};