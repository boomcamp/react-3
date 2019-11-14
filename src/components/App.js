import React, { Component } from 'react';
//import axios
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
axios.defaults.headers.common['Context-Type'] = 'application/json';


class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.search = this.search.bind(this);
  }
  //component did Mount
  componentDidMount() {
    axios
    .get('https://practiceapi.devmountain.com/api/posts')
    .then(response => {
    this.setState({posts: response.data});
  });
  }

  //update Post 
  updatePost(id, text) {

    console.log(id)
    console.log(text)
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text}) 
    .then(response=> {
      this.setState({posts: response.data});
    })
    .catch(err => console.log(err))
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(response => {
        this.setState({ posts: response.data });
      });
  }

  search(e){
    axios
      .get(`https://practiceapi.devmountain.com/api/posts`)
      .then(response => {
        var searchVal = response.data.filter(item => {
          return item.text.toLowerCase().match(e.toLowerCase())
        })
        this.setState({ posts: searchVal });
        
      });
    }
  
  createPost(text) {
    axios
    .post(`https://practiceapi.devmountain.com/api/posts`,{text})
    .then(response =>{
     this.setState({posts: response.data}); 
    });
  }

  render() {
    
    const { posts } = this.state;

    return (
      <div className="App__parent">
        
        <Header searchPost={this.search}/>

        <section className="App__content"> 

          <Compose  createPostFn={this.createPost} />

          {posts.map(post=> 
            <Post 
             key={post.id}
             id= {post.id}
             text={post.text} 
             date={post.date}
             updatePostFn = {this.updatePost}
             deletePostFn = {this.deletePost}
            />
          )
          }
        </section>
      </div>
    );
  }
}
export default App;