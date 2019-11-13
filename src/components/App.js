import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
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
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount(){
    axios
    .get('http://localhost:9090/posts')
    .then(response => {
      this.setState({ posts: response.data })
    });
  }
  updatePost(id, text) {
    axios
   .put(`http://localhost:9090/posts/${id}`, { text }).
    then(response => {
      const updatePost = response.data;
      const updatePosts = this.state.posts.map(post => {
        if (post.id === updatePost.id) {
          return { post, ...updatePost };
        } else {
          return post;
        }
      });
      this.setState({ posts: updatePosts });
    });
  }

  deletePost(id) {
    axios
    .delete(`http://localhost:9090/posts/${id}`)
    .then(se =>{
       return axios
        .get('http://localhost:9090/posts')
        .then(response => {
          this.setState({ posts: response.data })
        });
       }

    )

  }


  createPost(text) {
    axios
      .post('http://localhost:9090/posts', { text })
      .then(results => {
        return axios
        .get('http://localhost:9090/posts')
        .then(response => {
          this.setState({ posts: response.data })
        });
      });
  }
handleSearch(el){
this.setState({ posts: el})
}

  render() {
    const { posts } = this.state;
   // console.log(this.state.posts)
    return (
      <div className="App__parent">
        <Header  searchMain ={this.handleSearch}/>
    
        <section className="App__content">
            <Compose createPostFn={this.createPost}/>
          {
          
          this.state.posts.map(post => <Post key={post.id} text={post.text} date={post.date} id = {post.id} updatePostFn = {this.updatePost}   deletePostFn={this.deletePost}/>)
          }
        </section>
      </div>
    );
  }
}

export default App;
