import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Exchanges from './components/Exchanges';
import Homepage from './components/Homepage';
import Cryptocurrencies from './components/Cryptocurrencies';
import News from './components/News';
import CryptoDetails from './components/CryptoDetails';
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
      <Layout>
          <div classname='routes'>
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route exact path='/exchanges'>
                <Exchanges />
              </Route>
              <Route exact path='/cryptocurrencies'>
                <Cryptocurrencies />
              </Route>
              <Route exact path='/crypto/:coinId'>
                <CryptoDetails />
              </Route>
              <Route exact path='/news'>
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
      <div classname='footer'>
      </div>
    </div>
  )
}

export default App
