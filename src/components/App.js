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
    .then(response => this.setState({ posts: response.data }));
  }

  updatePost(id,text) {
    axios
    .put(`http://localhost:9090/posts/${id}`,{text})
    .then(response=>{
        
       
        this.setState({
            posts: [...this.state.cart,response.data]
        })
    })
  }

  deletePost(id) {
    axios
      .delete(`http://localhost:9090/posts/${id}`)
      .then(response=>{
         this.setState({
           posts: this.state.posts.filter(post => post.id !== id)
         })
      })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  searchPost(text){
     console.log(text);
     let filtered;
    axios
    .get('http://localhost:9090/posts')
    .then(response => {
      let data = response.data;
      let regex = new RegExp(decodeURI(text),'gi');
      filtered = data.filter(dt => dt.text.match(regex));
      this.setState({ posts: filtered });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost}/>

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post 
            key={post.id}
            id={post.id} 
            text={post.text} 
            date={post.date}
            updatePostFn = {this.updatePost}
            deletePostFn = {this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
