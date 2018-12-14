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
        title={`Card: ${props.title}`}
        description={`Card info: ${props.info}`}
    />
  </Card>
  )

  const DemoMetaAction = props => (
  <Card actions={[<Icon type="table">Details</Icon>]} >
    <Meta avatar={<Icon type="dashboard" />}
        title={`Card: ${props.title}`}
        description={`Card info: ${props.info}`}
    />
  </Card>
  )

  const DemoBox = props => (
  <Card hoverable={true} 
        title={`Card: ${props.title}`} 
        onClick={(e) => { onCardSelect(e,props) } }
        >
  {props.children}
  </Card>
  )

  return (
    <Page1Container>
      <PageHeader>Page One</PageHeader> 
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoMeta title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMeta></Col>
        <Col span={4}><DemoMeta title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMeta></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoMetaAction title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMetaAction></Col>
        <Col span={4}><DemoMetaAction title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoMetaAction></Col>
      </Row>
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4}><DemoBox title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoBox></Col>
        <Col span={4}><DemoBox title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoBox></Col>
        <Col span={4}><DemoBox title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoBox></Col>
        <Col span={4}><DemoBox title="Card Title" info="Card description text" link="funding" icon="dashboard">col-4</DemoBox></Col>
      </Row>
    </Page1Container>
    );
}
Page1.propTypes = {
  isMobile: PropTypes.bool,
};