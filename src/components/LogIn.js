
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
import { authenticate } from "src/app/index.js";


const CryptoLogin = () => {
    const onFinish = (values) => { //Got user data
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };


  const mapLogin = (state) => {
    return {
      user: state.auth,
      name: "login",
      displayName: "Login",
      error: state.auth.error,
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      handleLoginSubmit: (username, password, name) => {
        dispatch(authenticate(username, password, name));
      },
    };
  };
  
  

export default connect(mapLogin, mapDispatch)(CryptoLogin);