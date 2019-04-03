import React from 'react';
import { Post } from './Post';

export class PostPage extends React.Component {
  state = {};

  componentDidMount() {
    const postUrl = this.props.match.params.url;
    fetch(`http://localhost:3030/api/posts/${postUrl}`)
      .then(response => {
        if (response.status === 404) {
          this.setState({ error: 404 })
        } else {
          return response.json();
        }
      })
      .then(response => this.setState(() => response ? response : null));
  }

  render() {
    return this.state.error ? <p>404</p> : <Post full {...this.state} />;
  }
}