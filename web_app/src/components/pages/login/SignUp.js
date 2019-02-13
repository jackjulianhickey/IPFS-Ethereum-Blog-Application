import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SignUp extends Component{

  render() {
    return (
      <form onSubmit={this.props.onSubmit} style={formStyle}>
        <div>
          <h1>Sign Up</h1>
          <input
            label = {"email"}
            type={"text"}
            name={"newEmail"}
            style={titleStyle}
            placeholder={"Enter your email address"}
            value={this.props.email}
            onChange={this.props.onChange}/>

            <input
            type={"text"}
            name={"userName"}
            style={titleStyle}
            placeholder={"Enter your name"}
            value={this.props.userName}
            onChange={this.props.onChange}/>
        </div>
        <div>
          <input
            type="submit"
            value="Sign Up"
            className="btn"
            style={{flex: '1', background: '#333', textAlign: 'center'}}
          />
        </div>
      </form>
    );
  }

}

const formStyle = {
  background: '#5B5B5B',
  overflow: 'hidden',
  display: 'grid',
  float: 'right',
  gridTemplateColumns: "500px 1fr"

}

const titleStyle = {
  textAlign: 'left',
  marginTop: '10px',
  marginLeft: '10px',
  padding: '10px',
  width: '50%'
}
const blogStyle = {
  marginTop: '10px',
  marginLeft: '10px',
  width: '50%',
  overflowY: 'auto'

}
//PropTypes
SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
}

export default SignUp
