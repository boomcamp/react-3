import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
axios.defaults.headers.common['Content-Type'] = 'application/json';
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.searchPost = this.searchPost.bind(this);

  }

  componentDidMount() {
    axios
    .get(`http://localhost:9090/posts`)
    .then(response => this.setState({posts: response.data}))
  }

  updatePost(id, text) {
    axios
    .put(`http://localhost:9090/posts/${id}`, { text })
    .then(response => {
      const updatePost = response.data;
      const updatePosts = this.state.posts.map(p =>{
          if(p.id === updatePost.id)
          {
            return {p, ...updatePost}
          }
          else{return p}
      })
      this.setState({ posts: updatePosts });
    });
  }

  deletePost(id) {
    axios
    .delete(`http://localhost:9090/posts/${id}`)
    .then(response => {
        this.setState({
        posts: this.state.posts.filter(post => post.id !== id)
      });
    });
  }

  createPost(text) {
    const date = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    axios
      .post('http://localhost:9090/posts', { text, date })
      .then(response =>
        this.setState({ posts: [response.data, ...this.state.posts] })
      );
  }
  searchPost = (text) => {
    axios
    .get(`http://localhost:9090/posts/?q=${encodeURI(text)}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPost={this.searchPost}/>

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
