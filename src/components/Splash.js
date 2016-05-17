var React = require('react');

var { Component } = React;

class Splash extends Component {
  render() {
    return (
      <div className="content-page">
        <h1 className="header-text">bleep.</h1>
        <h2>Super secure messaging for healthcare teams</h2>
        <img className="store-logos" src="http://www.vvarchcenter.org/resources/Pictures/Android-App-Store-logos.png" />
      </div>
    )
  }
}

module.exports = Splash;
