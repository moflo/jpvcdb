
import React from 'react';
import { Row, Col } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>JPVCDB Stack</h2>
              <div>
                <a target="_blank " href="https://github.com/moflo">
                  GitHub
                </a>
              </div>
              <div>
                <a href="http://pro.ant.design">Ant Design</a>
              </div>
              <div>
                <a href="https://nextjs.org">NextJS</a>
              </div>
              <div>
                <a href="https://www.reactjs.org">ReactJS</a>
              </div>
              <div>
                <a target="_blank " href="https://ant.design/docs/react/introduce">
                  ReactJS
                </a>
                <span> - </span>
                Ant Design of React
              </div>
              <div>
                <a target="_blank " href="https://firebase.google.com/">
                  Firebase
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Sources</h2>
              <div>
                <a href="http://ycdb.co">YCDB</a>
                <span> - </span>
                Design inspiration
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://500startups.jp">500 Startups</a> - Japan
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Contact</h2>
              <div>
                <a href="/contact">
                  Contact Us
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                  Data Questions
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design">
                  Design Questions
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img className="title-icon" src="/static/logo-white.png" alt="" />
                Mobile Flow LLC
              </h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://namaikiventures.com/">Namaiki</a>
                <span> - </span>
                Ventures
                </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://namaikiventures.com/">Namaiki</a>
                <span> - </span>
                Studio
              </div>
              <div>
                <a href="/login">Admin</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>
          <span
            style={{
              lineHeight: '16px', paddingRight: 12, marginRight: 11, borderRight: '1px solid rgba(255, 255, 255, 0.55)',
            }}
          >
            <a
              href="https://moflo.me/privacy.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy
            </a>
          </span>
          <span style={{ marginRight: 24 }}>
            <a
              href="https://moflo.me/privacy.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms
            </a>
          </span>
          <span style={{ marginRight: 12 }}>Copyright</span>
          <span style={{ marginRight: 12 }}> © 2018 Mobile Flow LLC</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
