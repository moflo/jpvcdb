import * as React from 'react';
import {Row, Col, Form, Input, Icon, Button, Alert, notification} from 'antd';
import { doEmailSignin, redirectIfAuthenticated } from "../lib/auth";
import Link from 'next/link'
import styled from 'styled-components';

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const LoginContainer = styled.div`
  align-self: center;
  max-width: 500px;
  margin: 0 auto;
  background-color: #FFF;
  border-radius: 5px;
  padding: 20px;
`

const BodyWrapper = styled.div`
  background: linear-gradient(to left top,#bf0216,#f44e5f);
  min-height: 600px;
  height: 100vh;
  width: 100%;
`

const FooterContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  color: #FFF;

  a {
    color: #FFF;
    text-decoration: underline;
  }
`

const FormItem = Form.Item;

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

class LoginForm extends React.Component {

  // static async getInitialProps () {
  //   return {}
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    const {history} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        console.log(`handleSubmit: `+JSON.stringify(values) )

        // doGooglePopup().then((result) => {
        //   console.log("login result", result)
        //   redirectIfAuthenticated(result)
        // })

        doEmailSignin(values.email,values.password).then((result) => {
            console.log("login result", result)
            redirectIfAuthenticated()
          })
          
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <Row type="flex" justify="space-around" align="middle" style={{height: '100%'}}>
          <Col span={12}>
            <LogoContainer>
              <img src="/static/logo-word-white.png" alt="logo"/>
            </LogoContainer>
            <LoginContainer>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                  })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </LoginContainer>
            <FooterContainer>
            <Link href="/">
              <a>Home</a>
            </Link>
            </FooterContainer>
          </Col>
        </Row>
    );
  }
}

class Login extends React.Component {
  
    render() {
    const LoginFormWrapped = Form.create()(LoginForm);

      return (
        <BodyWrapper>
            <LoginFormWrapped />
        </BodyWrapper>
      );
    }
  }

// export default Form.create()(Login);
export default Login;
