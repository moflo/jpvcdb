import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Card, Row, Col, Avatar, Button, Icon } from 'antd';
import styled from 'styled-components';

const ContactSection = styled.div`
    text-align: left;
    border: 1px solid #d9d9d9;
`


export default function CompanyContact({ isMobile, companyID }) {

  const { Meta } = Card;

  const onCardSelect = (e,props) => {
    const target = props.link || "exit"
    console.log("Select Card: ", target)
    // Router.push(`/ranking?id=${target}`,`/ranking/${target}`)
  }
  
  return (
    <ContactSection>
        <Button type="primary" icon="link">Open the Company Website</Button>
        <br />
        <br />

        <h2>Contact</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <Button shape="circle" icon="twitter" />
            <Button shape="circle" icon="facebook" />
        </div>

        <br />
        <br />
        <h2>Address</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <p>Shibuya, Tokyo</p>
            <p>Japan</p>
        </div>
        
        <br />
        <br />
        <h2>Location</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <img src="https://via.placeholder.com/300" />
        </div>
    </ContactSection>
    );
}
CompanyContact.propTypes = {
  isMobile: PropTypes.bool,
};