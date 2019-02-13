import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LoginForm extends Component{

  render() {
    return (
      <form onSubmit={this.props.onSubmit} style={formStyle}>
        <div>
        <h1>Login</h1>
          <input
            type={"text"}
            name={"email"}
            style={titleStyle}
            placeholder={"Enter your email address"}
            value={this.props.email}
            onChange={this.props.onChange}/>
        </div>
        <div>
          <input
            type="submit"
            value="Sign In"
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
    float: 'left',
    gridTemplateColumns: "500px 1fr"

}
const titleStyle = {
  textAlign: 'left',
  marginTop: '10px',
  marginLeft: '10px',
  padding: '10px',
  width: '50%'
}
//PropTypes
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

export default LoginForm
