import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NewBlogForm extends Component{

  render() {
    return (
      <form onSubmit={this.props.onSubmit} style={{ display: 'block', background: '#333' }}>
        <div>
          <input
            type={"text"}
            name={"title"}
            style={titleStyle}
            placeholder={"Enter your blogs name"}
            value={this.props.title}
            onChange={this.props.onChange}/>
        </div>
        <div>
          <input
            type={"text"}
            name={"blog"}
            style={blogStyle}
            placeholder={"Start your new blog"}
            value={this.props.blog}
            onChange={this.props.onChange}/>
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{flex: '1'}}
          />
        </div>
      </form>
    );
  }

}

const blogStyle = {
  textAlign: 'left',
  marginTop: '10px',
  padding: '10px',
  width: '50%',
  height: '500px'
}

const titleStyle = {
  textAlign: 'left',
  marginTop: '10px',
  padding: '10px',
  width: '50%'
}
//PropTypes
NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  blog: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default NewBlogForm
