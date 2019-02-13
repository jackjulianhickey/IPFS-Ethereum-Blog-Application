import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>BlockBlog</h1>
      <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/mypage">My Blog</Link> | <Link style={linkStyle} to="/newblog">New Blog</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'right',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'

}

const titleStyle = {
  textAlign: 'left'
}

export default Header;
