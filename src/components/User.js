var React = require('react');

var { Component } = React;
const Firebase = require('firebase');
var Ref = new Firebase("https://bleep.firebaseio.com");

let Content;

class User extends Component {

  componentWillReceiveProps(nextProps) {
    this.setState({
      static: false
    })
  }

  pendUser() {
    const self = this;
    const RegRef = Ref.child('enrolments/' + self.props.hospital + '/registered/' + self.props.uid);
    RegRef.once("value", function(data) {
      const AllocRef = Ref.child('enrolments/' + self.props.hospital + '/pending/' + self.props.uid);
      AllocRef.set(data.val(), function(error) {
        if (!error) RegRef.remove();
        self.setState({ static: true })
        const RemoveHospitalRef = Ref.child('users/' + self.props.uid + '/hospitals/' + self.props.hospital);
        RemoveHospitalRef.remove();
      });
    })
  }

  registerUser() {
    const self = this;
    const AllocRef = Ref.child('enrolments/' + this.props.hospital + '/pending/' + this.props.uid);
    AllocRef.once("value", function(data) {
      const RegRef = Ref.child('enrolments/' + self.props.hospital + '/registered/' + self.props.uid);
      RegRef.set(data.val(), function() {
        AllocRef.remove();
        self.setState({ static: true })
        const SetHospitalRef = Ref.child('users/' + self.props.uid + '/hospitals/' + self.props.hospital);
        SetHospitalRef.set(true);
      });
    })
  }

  removeUser() {
    const self = this;

    // Remove from either the pending or registered lists

    if (this.props.pending) {
      const AdminRef = Ref.child('enrolments/' + self.props.hospital + '/pending/' + self.props.uid);
      AdminRef.remove();
    } else {
      const AdminRef = Ref.child('enrolments/' + self.props.hospital + '/registered/' + self.props.uid);
      AdminRef.remove();
    }

    // Remove the profile

    const ProfileRef = Ref.child('users/' + self.props.uid);
    ProfileRef.remove();

  }

  render() {

    if (this.state && this.state.static) {
      Content = <div></div>
    } else if (this.props.profile && this.props.pending) {
      Content = (
        <div className="userwrap">
        <div className="demographics">
          <h2>@ {this.props.profile.username}</h2>
          <div className="labelrow"><h3 className="labelprefix">Full Name: </h3><h3> {this.props.profile.fullname || 'Unknown'}</h3></div>
          <div className="labelrow"><h3 className="labelprefix">Email: </h3><h3> {this.props.profile.email || 'Unknown'}</h3></div>
          <div className="labelrow"><h3 className="labelprefix">Employee #: </h3><h3> {this.props.profile.employeenumber || 'Unknown'}</h3></div>
        </div>
        <div className="profilerow">
          <h5 className="prefix">Profession</h5>
          <input value={this.props.profile.profession} placeholder="Profession"></input>
        </div>
        <div className="profilerow">
          <h5 className="prefix">Grade</h5>
          <input value={this.props.profile.grade} placeholder="Grade"></input>
        </div>
        <div className="profilerow">
          <h5 className="prefix">Speciality</h5>
          <input value={this.props.profile.speciality} placeholder="Speciality"></input>
        </div>
        <div className="profilerow">
          <h5 className="prefix">Location</h5>
          <input value={this.props.profile.location} placeholder="Location"></input>
        </div>
        <div className="profilerow">
          <h5 className="prefix">Age</h5>
          <input value={this.props.profile.age} placeholder="Age"></input>
        </div>
        <div className="buttons">
          <button onClick={() => this.registerUser()}>Register</button>
          <button onClick={() => this.removeUser()}>Remove</button>
        </div>
        </div>
      )
    } else if (this.props.profile && !this.props.pending) {
        Content = (
          <div className="userwrap">
          <div className="demographics">
            <h2>@ {this.props.profile.username}</h2>
            <div className="labelrow"><h3 className="labelprefix">Full Name: </h3><h3> {this.props.profile.fullname || 'Unknown'}</h3></div>
            <div className="labelrow"><h3 className="labelprefix">Email: </h3><h3> {this.props.profile.email || 'Unknown'}</h3></div>
            <div className="labelrow"><h3 className="labelprefix">Employee #: </h3><h3> {this.props.profile.employeenumber || 'Unknown'}</h3></div>
          </div>
          <div className="profilerow">
            <h5 className="prefix">Profession</h5>
            <input value={this.props.profile.profession} placeholder="Profession"></input>
          </div>
          <div className="profilerow">
            <h5 className="prefix">Grade</h5>
            <input value={this.props.profile.grade} placeholder="Grade"></input>
          </div>
          <div className="profilerow">
            <h5 className="prefix">Speciality</h5>
            <input value={this.props.profile.speciality} placeholder="Speciality"></input>
          </div>
          <div className="profilerow">
            <h5 className="prefix">Location</h5>
            <input value={this.props.profile.location} placeholder="Location"></input>
          </div>
          <div className="profilerow">
            <h5 className="prefix">Age</h5>
            <input value={this.props.profile.age} placeholder="Age"></input>
          </div>
          <div className="buttons">
            <button onClick={() => this.pendUser()}>Pend User</button>
            <button onClick={() => this.removeUser()}>Remove</button>
          </div>
          </div>
        )
    } else {
      Content = <div></div>
    }

    return Content;
  }
}

module.exports = User;
