import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {HomepageItems} from "./HomepageItems";

class Homepage extends Component {
  render() {
    return this.props.userBlogs.map((blog) => (
      <HomepageItems key = {blog.id} blog = {blog} />
    ));

  }
}

//PropTypes
Homepage.propTypes = {
  userBlogs: PropTypes.array.isRequired
}

export default Homepage
