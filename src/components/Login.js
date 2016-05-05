var React = require('react');

var { Component } = React;

const Firebase = require('firebase');
const Loader = require('react-loader');

var ref = new Firebase("https://bleep.firebaseio.com");

class Login extends Component {

  constructor() {
    super()
    this.state = { loaded: true };
  }

  _handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  lookupEmail(user, callback) {
    const ChildRef = ref.child('dict/' + user.toLowerCase());
    ChildRef.once("value", function(snapshot) {
      if (snapshot.val()) {
        callback(snapshot.val().email)
      } else {
        callback(false);
      }
    });
  }

  login(user,pass) {
    const _ = this;
    this.setState( { loaded: false} );

    if (user && pass) {

    this.lookupEmail(user, function(response) {

      if (response) {

      ref.authWithPassword({
          email    : response,
          password : pass
        }, function(error, authData) {
          if (error) {
            alert("Login Failed!", error);
            _.setState( { loaded: true} );
          } else {
            console.log("Authenticated successfully with payload:", authData);
            _.setState( { loaded: true} );
          }
        });

      } else {
        _.setState( { loaded: true} );
        alert("Sorry, you do not have an account registered")
      }
    });

  } else {
    alert("Please fill out the username and password fields")
    _.setState( { loaded: true} );
  }
  }

  render() {
    return (

    <div><h1>Sign In Now </h1>
<Loader loaded={this.state.loaded} color="#FFF">
    <div className="login-form">

    <input name="user" onChange={(e) => this._handleChange(e) } type="text" placeholder="Username" />
    <input name="pass" onChange={(e) => this._handleChange(e) } type="password" placeholder="Password" />
    <button onClick={() => this.login(this.state.user, this.state.pass) }>Sign In</button>

    </div>
</Loader>
    </div>

  )
  }
}

module.exports = Login;
