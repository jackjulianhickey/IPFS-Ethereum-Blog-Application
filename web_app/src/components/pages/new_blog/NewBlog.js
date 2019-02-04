import React, { Component } from 'react';
import NewBlogForm from './NewBlogForm'
import PropTypes from 'prop-types';


class NewBlog extends Component{
  state = {
    blog: '',
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addBlog(this.state.title, this.state.blog);
    this.setState({ title: '', blog: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <NewBlogForm onSubmit = {this.onSubmit} onChange = {this.onChange} blog = {this.state.blog} title = {this.state.title}/>
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
NewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlog
