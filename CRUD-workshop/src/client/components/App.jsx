import React from 'react';
import Cookie from 'universal-cookie';
import { Switch, Route } from 'react-router-dom'
import { Header } from './Header';
import { PostPage } from './posts/PostPage';
import { Panel } from './admin/Panel';
import { Login } from './admin/Login';
import { MainPage } from './MainPage';
import { Edit } from './admin/Edit';
import { sortByDate } from '../helpers';

const cookie = new Cookie();

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'React blog',
      subtitle: 'My personal blog',
      img: '/images/image.jpg',
      posts: []
    }
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts = () => {
    fetch('http://localhost:3030/api/posts')
      .then(response => response.json())
      .then(response => this.setState({ posts: response }));
  }

  onLogin = () => this.forceUpdate();

  render() {
    const { title, subtitle, img, posts } = this.state;
    const token = cookie.get('token');
    return (
      <section>
        <Header title={title} subtitle={subtitle} />
        <Switch>
          <Route exact path='/' render={() => <MainPage posts={sortByDate(posts)} img={img} />} />
          <Route exact path='/admin' render={token ? () => <Panel update={this.updatePosts} /> : () => <Login onLogin={this.onLogin} />} />
          <Route exact path='/edit' render={token ? props => <Edit {...props} update={this.updatePosts} /> : () => <Login onLogin={this.onLogin} />} />
          <Route path='/edit/:url' render={token ? props => <Edit {...props} update={this.updatePosts} /> : () => <Login onLogin={this.onLogin} />} />
          <Route path='/:url' render={props => <PostPage {...props} />} />
          <Route path='*' render={() => <MainPage posts={sortByDate(posts)} img={img} />} />
        </Switch>
      </section>
    );
  }
}
