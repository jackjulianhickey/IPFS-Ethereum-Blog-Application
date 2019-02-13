import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {UserpageItems} from "./UserpageItems";

class Userpage extends Component {
  render() {
    return this.props.userBlogs.map((blog) => (
      <UserpageItems key = {blog.id} blog = {blog} selectedBlog={this.props.selectedBlog}/>
    ));

  }
}

//PropTypes
Userpage.propTypes = {
  userBlogs: PropTypes.array.isRequired,
  selectedBlog: PropTypes.func.isRequired
}

export default Userpage
