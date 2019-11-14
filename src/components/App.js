import React, { Component } from 'react';
import axios from 'axios'; // import axios
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
  }

  componentDidMount() {
    axios
      .get('https://practiceapi.devmountain.com/api/posts')
      .then(res => this.setState({posts: res.data}))
      .catch(err=>console.log(err))
  }

  updatePost = (id ,text) => {
    axios 
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{ text })
      .then(res=> {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err))
  }

  deletePost = (id) => {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err))
  } 

  createPost = (text) => {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, {text})
      .then(res => {
        this.setState({ posts: res.data})
      })
      .catch(err => console.log(err))
  }

  search = (e) => {
    axios
      .get('https://practiceapi.devmountain.com/api/posts')
      .then(res => {
        var searchValue = res.data.filter(item => {
          return item.text.toLowerCase().match(e.toLowerCase())
        })
        this.setState({ posts: searchValue})
      })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPost={this.search}/>

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {
            posts.map(post => (
              <Post 
                id={post.id} 
                key={post.id} 
                date={post.date} 
                text={post.text} 
                updatePostFn={this.updatePost} 
                deletePostFn={this.deletePost} 
              />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
