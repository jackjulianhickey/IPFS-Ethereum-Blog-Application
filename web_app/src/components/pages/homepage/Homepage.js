import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {HomepageItems} from "./HomepageItems";

class Homepage extends Component {
  render() {
    return this.props.followingBlogs.map((blog) => (
      <HomepageItems key = {blog.id} blog = {blog} selectedBlog={this.props.selectedBlog}/>
    ));

  }
}

//PropTypes
Homepage.propTypes = {
  followingBlogs: PropTypes.array.isRequired,
  selectedBlog: PropTypes.func.isRequired
}

export default Homepage
