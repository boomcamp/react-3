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
    this.findPost = this.findPost.bind(this);

  }

  componentDidMount() {
    axios
      .get('http://localhost:9090/posts')
      .then(response => {
        console.log(response.data)
        this.setState({
          posts : response.data
        })
      })
  }

  updatePost(id, text) {
    axios
      .put(`http://localhost:9090/posts/${id}`, { text })
      .then(response => {
        const updatedPost = response.data;
        const updatedPosts = this.state.posts.map(p => {
          if(p.id === updatedPost.id){
            return { p, ...updatedPost}
          }else{
            return p;
          }
        })
        this.setState({
          posts : updatedPosts
        })
      })
  }

  deletePost(id) {
    axios
      .delete(`http://localhost:9090/posts/${id}`)
      .then(response => {
        this.setState({
          posts: this.state.posts.filter(post => {
            return post.id !== id
          })
        })
      })
  }

  createPost(text) {
    axios
      .post('http://localhost:9090/posts', { text })
      .then( response => {
        console.log(response)
        this.setState({
          posts: this.state.posts.concat(response.data)
        })
      })
  }
  findPost( text ){
    console.log(encodeURI(text))
    axios
      .get(`http://localhost:9090/posts?q=${encodeURI(text)}`)
      .then( response => {
        this.setState({
          posts: response.data
        })
      })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.findPost} />

        <section className="App__content">
          <Compose 
          createPostFn={this.createPost}
           />
          {posts.map(post => (
            <Post 
            key={post.id} 
            date={post.date} 
            text={post.text}
            id={post.id}
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
