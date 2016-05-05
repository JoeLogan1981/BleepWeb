var React = require('react');

var { Component } = React;
const Firebase = require('firebase');
var Ref = new Firebase("https://bleep.firebaseio.com");
const Loader = require('react-loader');

let Content;

class User extends Component {

  constructor() {
    super();
    this.state = { loaded: true, profile: {} };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid) {
    this.setState({
      loaded: false,
    })
    }
    const self = this;
    const ProfileRef = Ref.child('users/' + nextProps.uid)
    ProfileRef.once("value", function(data) {
      self.setState({
        profile: data.val(),
        loaded: true,
      })
    })
  }

  registerUser() {
    const self = this;
    const AllocRef = Ref.child('enrolments/' + this.props.hospital + '/pending/' + this.props.uid);
    AllocRef.once("value", function(data) {
      const RegRef = Ref.child('enrolments/' + self.props.hospital + '/registered/' + self.props.uid);
      RegRef.set(data.val(), function() {
        AllocRef.remove();
      });
    })
  }

  pendUser() {
    const self = this;
    const RegRef = Ref.child('enrolments/' + self.props.hospital + '/registered/' + self.props.uid);
    RegRef.once("value", function(data) {
      const AllocRef = Ref.child('enrolments/' + self.props.hospital + '/pending/' + self.props.uid);
      AllocRef.set(data.val(), function(error) {
        if (!error) RegRef.remove();
      });
    })
  }

  deleteUser() {

  }

  render() {

    switch(!this.state.static) {
      case false:
       Content = (<div className="user">

                 <div className="top">
                   <h1>@ {this.state.profile.username}</h1>
                   <h1>{this.state.profile.email}</h1>
                 </div>

                 { this.props.pending ?

                 <div className="content">

               <Loader loaded={this.state.loaded} color="#A0A0A0">



               <h2>Set Initial Profile and Register User</h2>
               <div className="profilerow">
                 <h5>Profession</h5>
                 <input value={this.state.profile.profession} placeholder="Profession"></input>
               </div>
               <div className="profilerow">
                 <h5>Grade</h5>
                 <input value={this.state.profile.grade} placeholder="Grade"></input>
               </div>
               <div className="profilerow">
                 <h5>Speciality</h5>
                 <input value={this.state.profile.speciality} placeholder="Speciality"></input>
               </div>
               <div className="profilerow">
                 <h5>Location</h5>
                 <input value={this.state.profile.location} placeholder="Location"></input>
               </div>
               <div className="profilerow">
                 <h5>Age</h5>
                 <input value={this.state.profile.age} placeholder="Age"></input>
               </div>
               <button onClick={() => this.registerUser()}>Register</button>



               </Loader>
               </div>
               :

                   <div className="content">

                 <Loader loaded={this.state.loaded} color="#A0A0A0">



                 <h2>Set Initial Profile and Register User</h2>
                 <div className="profilerow">
                   <h5>Profession</h5>
                   <input value={this.state.profile.profession} placeholder="Profession"></input>
                 </div>
                 <div className="profilerow">
                   <h5>Grade</h5>
                   <input value={this.state.profile.grade} placeholder="Grade"></input>
                 </div>
                 <div className="profilerow">
                   <h5>Speciality</h5>
                   <input value={this.state.profile.speciality} placeholder="Speciality"></input>
                 </div>
                 <div className="profilerow">
                   <h5>Location</h5>
                   <input value={this.state.profile.location} placeholder="Location"></input>
                 </div>
                 <div className="profilerow">
                   <h5>Age</h5>
                   <input value={this.state.profile.age} placeholder="Age"></input>
                 </div>
                 <button onClick={() => this.pendUser()}>Pend</button>



                 </Loader>
                 </div>

              }
               </div>
             )
        case true:
          Content = <div><h1>Static</h1></div>
          break;
    }

    return (
      <div>{ Content }</div>
    )
  }
}

module.exports = User;
