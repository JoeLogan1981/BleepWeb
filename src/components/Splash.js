var React = require('react');

var { Component } = React;

class Splash extends Component {
  render() {
    return (
      <div className="content-page">
        <h1>Ditch the pager and use your iPhone</h1>
        <h2>Quickly share information and communicate with the entire healthcare team through quick and easy to create channels</h2>
        <h2>Chat freely and share images to facilitate holistic care</h2>
        <h3>Compliant with AHPRA and RACHP standards</h3>
        <img className="store-logos" src="http://www.vvarchcenter.org/resources/Pictures/Android-App-Store-logos.png" />
      </div>
    )
  }
}

module.exports = Splash;
