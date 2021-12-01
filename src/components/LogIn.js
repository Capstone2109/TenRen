
// import React from 'react';
// import { Form, Input, Button, Checkbox } from 'antd';
// import { connect } from "react-redux";
// import { authenticate } from "../app/index.js";


// const CryptoLogin = () => {
//     const onFinish = (values) => { //Got user data
//       console.log('Success:', values);
//       //handleLoginSubmit(username, password, "User");
//     };
  
//     const onFinishFailed = (errorInfo) => {
//       console.log('Failed:', errorInfo);
//     };
  
//     return (
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
  
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!',
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>
  
//         <Form.Item
//           name="remember"
//           valuePropName="checked"
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>
  
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   };


//   const mapLogin = (state) => {
//     return {
//       user: state.auth,
//       name: "login",
//       displayName: "Login",
//     };
//   };
  
//   const mapDispatch = (dispatch) => {
//     return {
//       handleLoginSubmit: (username, password, name) => {
//         dispatch(authenticate(username, password, name));
//       },
//     };
//   };
  
  

// export default connect(mapLogin, mapDispatch)(CryptoLogin);

import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../app/index";

class CryptoLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      msg: "",
      msgBool: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    this.props.handleLoginSubmit(username, password, name);
  }

  message() {
    return <p>{this.state.msg}</p>;
  }

  render() {
    const { handleSubmit } = this;
    const { name, displayName, error } = this.props;
    return (
      <div>
        <h1>Sign In</h1>
        <h4>Sign in and  Earning!</h4>
        {this.state.msgBool ? this.message() : null}
        <form onSubmit={handleSubmit} name={name}>
          <label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    user: state.auth,
    name: "login",
    displayName: "Login",
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
