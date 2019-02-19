import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import PropTypes from 'prop-types';


class Login extends Component{
  state = {
    email: '',
    newEmail: ''
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state.email);
    this.setState({ email: '' });
  }

  onSubmitSignUp = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.newEmail);
    this.setState({ email: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div style={loginStyle}>
        <LoginForm onSubmit = {this.onSubmitLogin} onChange = {this.onChange} email = {this.state.email}/>
        <SignUp onSubmit = {this.onSubmitSignUp} onChange = {this.onChange} email = {this.state.newEmail} />
      </div>
      );
  }

}

const loginStyle = {
  background: '#5B5B5B',
  margin: '0',
  height: '100%'
}

const titleStyle = {
  textAlign: 'left',
  margin: 'auto',
  padding: '10px',
  width: '50%'
}
//PropTypes
Login.propTypes = {
  login: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired

}

export default Login
