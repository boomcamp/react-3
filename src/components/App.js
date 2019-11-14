import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

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
      this.setState({ posts: res.data })
    })
  }

  updatePost(id,text,date) {
    axios
    .put(`http://localhost:9090/posts/${id}`, {text, date})
    .then(res => {
      const updatedPost = res.data;
      const updatedPosts = this.state.posts.map(post => {
        if (post.id === updatedPost.id) {
          return { post, ...updatedPost };
        } else {
          return post;
        }
      });
      this.setState({posts: updatedPosts})
    })
  }

  deletePost(id) {
    axios
    .delete(`http://localhost:9090/posts/${id}`)
    .then(res=>{
      this.setState({
        posts: this.state.posts.filter(post => post.id !== id)
      })
    })
  }

  searchPost(text){
    axios
    .get(`http://localhost:9090/posts?q=${text}`)
    .then(res=> {
      this.setState({ posts: res.data })
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
    .then(res => {
      this.setState({ posts: res.data})
    })
  }
  
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header
        searchPostFn = {this.searchPost}
        />

        <section className="App__content">
          <Compose 
            createPostFn = {this.createPost}
          />
            {posts.map(post=>(
              <Post 
              key ={post.id}
              text ={post.text}
              date ={post.date}
              id ={post.id}
              updatePostFn={this.updatePost}
              deletePostFn = {this.deletePost}
              
              />
            ))}
        </section>
      </div>
    );
  }
}

export default App;
