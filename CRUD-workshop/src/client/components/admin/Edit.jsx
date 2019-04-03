import React from 'react';
import Cookie from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookie = new Cookie();

export class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      title: '',
      body: '',
      url: '',
      published: false,
      isPreview: false,
    }
    this.onPublish = this.onPublish.bind(this);
  }

  fetchPostData(url) {
    fetch(`http://localhost:3030/api/posts/${url.toString()}`)
      .then(response => {
        if (response.status === 404) {
          window.location.assign('/');
        } else return response.json();
      })
      .then(response => this.setState({ ...response }))
      .catch(() => this.setState({ error: 404 }));
  }

  componentDidMount() {
    const url = this.props.match.params.url;
    if (url) this.fetchPostData(url);
  }

  onTogglePreview = ({ target }) => {
    const { checked } = target;
    this.setState({ isPreview: checked });
  }

  createPost() {
    fetch('http://localhost:3030/api/posts', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': cookie.get('token'),
      },
      method: 'POST',
      body: `title=${this.state.title}&body=${this.state.body}&url=${this.state.url}`,
    })
      .then(response => response.json())
      .then(response => {
        this.props.update();
        this.setState({ published: true })
      });
  }

  updatePost() {
    fetch(`http://localhost:3030/api/posts/${this.state._id}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': cookie.get('token'),
        },
        method: 'PATCH',
        body: `title=${this.state.title}&body=${this.state.body}&url=${this.state.url}`,
      })
        .then(response => response.json())
        .then(response => {
          this.props.update();
          this.setState({ published: true })
        });
  }

  onPublish(e) {
    e.preventDefault();
    const url = this.props.match.params.url;
    if (url) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }

  getPreview = () => ({
    __html: this.state.body,
  });

  render() {
    return (
      <div className="post-edit">
        {this.state.published ? <Redirect to={`/${this.state.url}`} push /> : null}
        <form onSubmit={this.onPublish}>
          <input type="submit" value="Publish" />

          <label className="post-edit__title">Title: <input
            onChange={({ target }) => this.setState({ title: target.value })}
            value={this.state.title}
            type="text"
            required /><br />
          </label>

          <label className="post-edit__preview">
            Preview: <input type="checkbox" onChange={this.onTogglePreview} checked={this.state.isPreview} />
          </label>

          <label className="post-edit__url">URL: <input
            onChange={({ target }) => this.setState({ url: target.value })}
            value={this.state.url}
            type="text"
            required /><br />
          </label>

          <label>Body: <br />
            {this.state.isPreview ? <div className="post-edit__previewBlock" dangerouslySetInnerHTML={this.getPreview()}></div> :
              <textarea
                required
                value={this.state.body}
                onChange={({ target }) => this.setState({ body: target.value })}
                cols="100" rows="10" />}
          </label>
        </form>
      </div>
    );
  }
}
