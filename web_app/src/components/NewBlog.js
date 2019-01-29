import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NewBlog extends Component {
  state = {
    title: '',
    blog: '',
    date: ''
  }

  
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          name="title"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Blog Title ..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
        type="text"
        name="blog"
        style={{flex: '10', padding: '5px'}}
        placeholder="Add Blog ..."
        value={this.state.blog}
        onChange={this.onChange}/>
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}
