import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CryptoDetails from "./components/CryptoDetails";
import CryptoLogin from "./components/LogIn";
import GetNews from "./components/MakeApiCalls";
import UserProfile from "./components/UserProfile";
import quizApp from "./quizApp";
import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: false,
    };
    this.handleMode = this.handleMode.bind(this);
  }

  handleMode = (childData) => {
    this.setState({ mode: childData });
  };

  render() {
    return (
      <div className={`app ${this.state.mode === "true" ? "dark" : ""}`}>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
                <Route exact path="/quiz" component={quizApp} />
                <Route exact path="/profile">
                  <UserProfile handleMode={this.handleMode} />
                </Route>
                <Route exact path="/login">
                  <CryptoLogin />
                </Route>
                <Route exact path="/getnews">
                  <GetNews />
                </Route>
              </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Robin Noob <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
