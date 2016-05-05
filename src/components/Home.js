var React = require('react');

var { Component } = React;

const Firebase = require('firebase');
const UserListItem = require('./UserListItem');
const User = require('./User');

var Ref = new Firebase("https://bleep.firebaseio.com");

const hospital = 'rpa';

class Home extends Component {

  constructor() {
    super()
    this.state = { pending: {}, registered: {}}
  }

  componentDidMount() {

    const _ = this;

    // Pending Listener

    const PendingRef = Ref.child('enrolments/' + this.props.profile.adminOf + /pending/)
    PendingRef.on("value", function(data) {
      _.setState({
        pending: data.val(),
      })
    })

    // Registered Users Listener

    const RegisteredRef = Ref.child('enrolments/' + this.props.profile.adminOf + /registered/)
    RegisteredRef.on("value", function(data) {
      _.setState({
        registered: data.val(),
      })
    })
  }

  click(item, pending) {
    const self = this;
    const ProfileRef = Ref.child('users/' + item);
    ProfileRef.once("value", function(data) {
      self.setState({
        activeuser: item,
        pendingitem: pending,
        profile: data.val()
      })
    })
  }

  // Get User Name

  render() {

    return (
      <div className="home">
        <div className="home-cols">

            <div className="home-col-left">

              <h1>Registered Users</h1>

              { this.state.registered ?
                  Object.keys(this.state.registered).map(function(item, key) { return <UserListItem key={key} user={item} click={ () => this.click(item, false) }/> }, this)
                : <div></div>
              }

            </div>

            <div className="home-col-left home-col-left-two">
              <h1>Pending Users</h1>

              { this.state.pending ?
                Object.keys(this.state.pending).map(function(item, key) { return <UserListItem key={key} user={item} click={ () => this.click(item, true) }/> }, this)

              : <div></div>

            }

            </div>

            <div className="home-col-right">
              <User profile={this.state.profile} uid={this.state.activeuser} pending={this.state.pendingitem} hospital={this.props.profile.adminOf}/>
            </div>

        </div>
      </div>
    )
  }
}

module.exports = Home;
