var React = require('react');

var { Component } = React;
const Firebase = require('firebase');
var Ref = new Firebase("https://bleep.firebaseio.com");

class UserListItem extends Component {

  constructor() {
    super()
    this.state = { profile: {} }
  }

  componentWillMount() {
    const self = this;
    const ProfileRef = Ref.child('users/' + this.props.user + '/username')
    ProfileRef.once("value", function(data) {
      self.setState({
        username: data.val(),
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    const ProfileRef = Ref.child('users/' + nextProps.user + '/username')
    ProfileRef.once("value", function(data) {
      self.setState({
        username: data.val(),
      })
    })
  }

  render() {
    return <div><h5 onClick={ () => this.props.click() }>@ {this.state.username ? this.state.username: ''}</h5></div>
  }
}

module.exports = UserListItem;
