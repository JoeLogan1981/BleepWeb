var React = require('react');

var { Component } = React;
const FontAwesome = require('react-fontawesome');
import 'whatwg-fetch';

class Splash extends Component {

  constructor() {
    super();
    this.state = { sentmessage: false };
  }

  sendMessage() {
    let querystring = '?name=Bleep' + '&from=' + this.state.email + '&biz=Bleep' + '&message=' + this.state.email;
    fetch('http://188.166.241.95/send' + querystring, {
      method: 'get',
    }).then(function(response) {

    }).catch(function(err) {

    });
    this.setState({sentmessage: true})
  };

  render() {

    console.log(this.state)

    return (
      <div className="content-page">
        <h1 className="header-text">bleep.</h1>
        <h5>Secure & Smart Messaging For Healthcare Teams</h5>
        { !this.state.sentmessage ?
        <div className="splash-form">
        <h4>Interested in beta testing Bleep at your clinic or hospital?</h4>
        <div className="splash-form-elements">
        <input onChange={ (t) => this.setState({email: t.target.value}) } className="splash-box" placeholder="Enter Email" />
        <button onClick={() => this.sendMessage()} className="suffix"><FontAwesome name="envelope" /></button>
        </div>
        </div> :
        <div>
          <h2 style={{color:'white'}}>Thank you for wanting to beta test Bleep! One of our engineers will be in touch in due course.</h2>
        </div> }

        {/* <div className="logos-section">
        <img className="store-logos" src="http://designpieces.com/wp-content/uploads/2016/02/download-on-the-app-store.png" />
        <img className="store-logos" src="http://designpieces.com/wp-content/uploads/2016/02/google-play-badge.png" />
        </div> */}

      </div>
    )
  }
}

module.exports = Splash;
