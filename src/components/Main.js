require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

const Splash = require('./Splash');
const Navbar = require('./Navbar');
const About = require('./About');
const Login = require('./Login');
const Home = require('./Home');

const Firebase = require('firebase');

const Ref = new Firebase("https://bleep.firebaseio.com");

let Content, Image, Text;

class AppComponent extends React.Component {

  constructor() {
    super()
    this.state = { token: false, nav: 'HOME' };
  }

  componentDidMount() {
    const _ = this;
    Ref.onAuth(function(authData) {
      if (authData) {
        const adminRef = Ref.child('users/' + authData.uid);
        adminRef.once("value", function(data) {
          if(data.val() && data.val().adminOf) {
            _.setState({token: true, authData: authData, profile: data.val() })
          } else {
            _.setState({token: false})
            alert('Not Permitted');
            Ref.unauth();
          }
        })

      } else {
        _.setState({token: false})
      }
    });
  }

  render() {

    switch (this.state.nav) {
      case 'HOME':
        Content = <Splash />
        Image = require('../images/bleep3.png');
        Text = 'Test';
        break;
      case 'ABOUT':
        Content = <About />
        Image = require('../images/bleep2.png');
        Text = 'Test';
        break;
      case 'LOGIN':
        Content = <Login />
        Image = require('../images/bleep4.png');
        Text = 'Test';
        break;
    }

    return (

      <div className="wrap">
        <div className="bar"><Navbar navTo={(r) => this.setState({nav: r})} /></div>
        { this.state.token ? <Home authData={this.state.authData} profile={this.state.profile} /> :
        <div className="cols">

          <div className="col-left">
            <img className="logo" src={ Image } />
          </div>
          <div className="col-right">
            { Content }
          </div>
        </div> }
      </div>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
