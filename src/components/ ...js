var React = require('react');

var { Component } = React;

class About extends Component {
  render() {
    return (
      <div>
      <h1>Fast and Effective Communication</h1>
      <p>{"Bleep takes the best parts from IRC, Twitter and Slack, and brings it over to hospitals and clinics.  Bleep's powerful channel system enables effective, rapid and multidisciplinary communication that is truly groundbreaking for healthcare"}</p>
      <h1>Provide Holistic and Multidisciplinary Care</h1>
      <p>{"Using Bleep's channels, information can be shared freely between everyone from doctors and nurses to physiotherapists and pharmacists."}</p>
      <h1>Security and Compliance</h1>
      <p>{"Bleep meets the standards provided by the RACGP and AHPRA for electronic communication, and utilises a 2048-bit security system"}</p>
      <h1>Available for iOS and Android</h1>
      <p>Bleep is rolling out soon for iOS and Android</p>
      </div>
    )
  }
}

module.exports = About;
