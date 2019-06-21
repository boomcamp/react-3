import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

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
    .get('http://localhost:9090/posts')
    .then(res => {
      this.setState({posts: res.data});
    });
  }

  updatePost(id, text) {
    const date = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    axios.put(`http://localhost:9090/posts/${id}`, { text, date })
    .then(res => {
      const updatePost = res.data;
      const updatePosts = this.state.posts.map(p => {
        if(p.id === updatePost.id) {
          return {p, ...updatePost };
        } else {
          return p;
        }
      });

      this.setState({posts: updatePosts});
    });
  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`)
    .then(res => {
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
    axios.post('http://localhost:9090/posts', { text, date })
    .then(res => {
      this.setState({posts: [res.data, ...this.state.posts]});
    })
  }

  searchPost(text) {
    console.log(text);
    let filtered;
    if(text != '') {
      axios.get(`http://localhost:9090/posts`)
      .then(res => {
        let regex = new RegExp(decodeURI(text),'gi');
        filtered = res.data.filter(e => e.text.match(regex));
        this.setState({ 
          posts: filtered 
        });
      });
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header searchPost={this.searchPost} />
        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {
            posts.map(p => (
            <Post 
              key={p.id} 
              text={p.text} 
              date={p.date} 
              id={p.id} 
              updatePostFn={this.updatePost} 
              deletePost={this.deletePost} 
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
