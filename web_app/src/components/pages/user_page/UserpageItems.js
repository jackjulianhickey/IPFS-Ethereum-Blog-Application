import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export class UserpageItems extends Component {

  getStyle = () => {
    return {
      background: '#5B5B5B',
      padding: '15px',
      borderBottom: '1px #000000 solid',
      color: 'white'
    }

  }

  setBlogHash = () => {
    this.props.selectedBlog(this.props.blog.hash)
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <p><Link style={{color: 'white'}} to={"/viewblog"} onClick={this.setBlogHash}> { this.props.blog.title } </Link></p>
      </div>
    );
  }

}

//PropTypes
UserpageItems.propTypes = {
  blog: PropTypes.object.isRequired,
  selectedBlog: PropTypes.func.isRequired
}

