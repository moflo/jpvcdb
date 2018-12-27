import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import { Skeleton, Button } from 'antd';
import styled from 'styled-components';
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map.js'), {
  ssr: false
});

const ContactSection = styled.div`
    text-align: left;
    border-left: 1px solid #d9d9d9;
    padding-left: 40px;
`

const MapBox = props => <div className="map-box"><h2>{props.title}</h2>{props.children}</div>;

export default function CompanyContact({ isMobile, isLoading, data }) {

  const www = isLoading ? 'https://jpvcdb.co' : data.www
  const address = isLoading ? <Skeleton paragraph={false} /> : data.address
  const city = isLoading ? <Skeleton paragraph={false} /> : data.city
  const zip = isLoading ? <Skeleton paragraph={false} /> : data.zip
  const twitter = data.twitterID || 'https://twitter.com/jpvcdb'
  const facebook = data.facebookID || 'https://facebook.com/'

  return (
    <ContactSection>
        <Button type="primary" icon="link" href={www}>Open the Company Website</Button>
        <br />
        <br />

        <h2>Social</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <Button shape="circle" icon="twitter" href={twitter} />
            <Button shape="circle" icon="facebook" href={facebook} />
        </div>

        <br />
        <br />
        <h2>Address</h2>
        <div style={{ margin: 10, paddingLeft: 20 }}>
            <p>{address}</p>
            <p>{city}</p>
            <p>{zip}</p>
        </div>
        
        <br />
        <br />
        <h2>Location</h2>
        <div style={{ margin: 10, width: 300, height: 300 }}>
            <Map />
        </div>
    </ContactSection>
    );
}
CompanyContact.propTypes = {
    isMobile: PropTypes.bool,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
  };