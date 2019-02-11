import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {HomepageItems} from "../homepage/HomepageItems";

export class ViewBlog extends Component {

  getStyle = () => {
    return {
      background: '#5B5B5B',
      position: 'absolute',
      height: '90%',
      width: '50%',
      bottom: '0',
      top: '90px',
      overflowY: 'auto',
      color: 'white'
    }

  }

  render() {
    return (
      <body>
      <div style={this.getStyle()}><p>{this.props.viewBlogData}</p></div>
      </body>
    );

  }
}

const viewBlogStyle = {
  display: 'block',
  position: 'absolute',
  height: 'auto',
  bottom: '0',
  top: '0px',
  left: '10px',
  right: '0',
  marginTop: '100px',
  marginBottom: '20px',
  background: '#5B5B5B',
  padding: '100px',
  borderBottom: '1px #000000 solid',
  color: 'white',
  textAlign: 'left',
  width: '50%'
}

ViewBlog.propTypes = {
  viewBlogData: PropTypes.string.isRequired
}
