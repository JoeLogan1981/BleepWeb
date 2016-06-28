var React = require('react');

var { Component } = React;
  const FontAwesome = require('react-fontawesome');
import SwipeableViews from 'react-swipeable-views';

let Content;

class About extends Component {

  constructor() {
    super();
    this.state = {index: 0}
  }

  pageOn() {
    return this.state.index === (numslides - 1) ? 0 : ++this.state.index;
  }

  render() {

    switch (this.state.index) {
      case 0:
        Content = (
          <div>
          <h1>The pager just died</h1>
          <p>With Bleep, we wanted to address the limitations of the pager and telephone in the era of holistic and multidisciplinary care.  Bleep enables teams to create and communicate through specific #team groups, much like Slack and Facebook</p>
          </div>
        )
        break;
      case 1:
        Content = (
          <div>
          <h1>What are Bleep #teams?</h1>
          <p>Using Bleep, you can create your own #teams and use them to communicate. For example, you can create a team for your colleagues on #wards, or a team for the #oncalldocs so that ward jobs are not missed. Bleep is flexible and fast.</p>
          </div>
        )
        break;
      case 2:
        Content = (
          <div>
          <h1>Organise your work</h1>
          <p>Imagine a nurse from the #wardsix team requests a new cannula for a patient?  With Bleep, you can pin items to your own organiser, and keep track of your own workload and jobs. No more missed fluid charts, cannulas or patient reviews!</p>
          </div>
        )
        break;
      case 3:
        Content = (
          <div>
          <h1>Secure and Compliant</h1>
          <p>Bleep is robust, powerful and secure. Through TLS and SSL encryption with 2048-bit hash tables, we can maintain absolute privacy and confidentialy. We also fully adhere to the RACGP, Medicare and AHPRA guidelines on e-health and ethics.</p>
          </div>
        )
        break;
    }

return (
  <div className="content-page">
  {Content}
    <div className="pager">
      <FontAwesome name={this.state.index === 0 ? 'circle' : 'circle-o'} onClick={() => this.setState({ index: 0}) } size='2x' style={Styles.PageButton}/>
      <FontAwesome name={this.state.index === 1 ? 'circle' : 'circle-o'} onClick={() => this.setState({ index: 1}) } size='2x' style={Styles.PageButton}/>
      <FontAwesome name={this.state.index === 2 ? 'circle' : 'circle-o'} onClick={() => this.setState({ index: 2}) } size='2x' style={Styles.PageButton}/>
      <FontAwesome name={this.state.index === 3 ? 'circle' : 'circle-o'} onClick={() => this.setState({ index: 3}) } size='2x' style={Styles.PageButton}/>
    </div>
  </div>
);
  }
}

const Styles = {
  PageButton : {
    marginLeft: 10,
    marginRight: 10,
  }
};


module.exports = About;
