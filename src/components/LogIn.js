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
      <div className='login-main-container'>
      <div className='login-main'>
      <div className='login'>
      <h1>Welcome to Robin Noob</h1>
      {this.state.msgBool ? this.message() : null}
      <form onSubmit={handleSubmit} name={name}>
        <label><h4>Username</h4>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>
        <label><h4>Password</h4>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <input className='button-login' type="submit" value="Login" />
      </form>
    </div>
    </div>
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

