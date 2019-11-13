import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9090/posts`)
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(e => console.log("ERROR ON FETCHING POSTS"))

  }

  updatePost(id, text) {
    axios.put(`http://localhost:9090/posts/${id}`, { text }).
      then(res => {
      const temp = this.state.posts.map(post => {
        if (post.id === res.data.id) {
          return {post, ...res.data };
        } else 
          return post;
      });

      this.setState({ posts: temp });
    });
  }

  deletePost(id) {
    axios
      .delete(`http://localhost:9090/posts/${id}`)
      .then(res => {
        this.setState({
          posts: this.state.posts.filter(post => post.id !== id)
        })
      })
      .catch(err => console.log("ERROR ON DELETE"))
  }

  createPost(texts) {
    axios
      .post(`http://localhost:9090/posts/`, {
        text: texts,
        date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getFullYear()}`
      })
      .then(res => {
        this.setState({
          posts: this.state.posts.concat(res.data)
        })
      })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => (
              <Post key={post.id} 
                    text={post.text} 
                    date={post.date} 
                    id={post.id} 
                    updatePostFn={this.updatePost} 
                    deletePostFn={this.deletePost}/>
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
