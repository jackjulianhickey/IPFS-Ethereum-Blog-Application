import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class HomepageItems extends Component {

  getStyle = () => {
    return {
      background: '#5B5B5B',
      padding: '15px',
      borderBottom: '1px #000000 solid',
      color: 'white'
    }

  }

  render() {
    return (
      <div style={this.getStyle()}>
        <p><a href={this.props.blog.url} style={{color: 'white'}}> { this.props.blog.title } </a></p>
      </div>
    );
  }

}

//PropTypes
HomepageItems.propTypes = {
  blog: PropTypes.object.isRequired
}

