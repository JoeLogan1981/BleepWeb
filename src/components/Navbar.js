const React = require('react');

const { Component } = React;

const Firebase = require('firebase');

const Ref = new Firebase("https://bleep.firebaseio.com");
const FontAwesome = require('react-fontawesome');

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      navon: false,
    }
  }

  componentDidMount() {
    const ref = new Firebase("https://bleep.firebaseio.com");
    const _ = this;
    ref.onAuth(function(authData) {
      if (authData) {
        _.setState({token: true})
      } else {
        _.setState({token: false})
      }
    });
  }

  render() {

    const image = require("../images/barlogo.png")
    return (
      <div className="bar-wrapper">
      <div className={this.state.navon ? "mobile-nav nav-show" : "mobile-nav"}>
        <div className="one" onClick={() => this.props.navTo('HOME')} ><FontAwesome name='home' size='2x' /></div>
        <div className="two" onClick={() => this.props.navTo('ABOUT')}><FontAwesome name='book' size='2x' /></div>
        <div className="three" onClick={() => this.props.navTo('LOGIN')}><FontAwesome name='key' size='2x' /></div>
      </div>
      <div className="logo-box">
      <img onClick={()=> this.setState({navon: !this.state.navon})}className="bar-logo" src={image}/>
      <h1 className="logo-text">bleep</h1>
      </div>
      { this.state.token ?
        <div className="items">
        <a onClick={() => Ref.unauth() }>Logout</a>
        </div>
        :
        <div className="items">
        <a onClick={() => this.props.navTo('HOME')}>Home</a>
        <a onClick={() => this.props.navTo('ABOUT')}>About</a>
        <a onClick={() => this.props.navTo('LOGIN')}>Login</a>
        </div>
      }
      </div>
    )
  }
}

module.exports = Navbar;
