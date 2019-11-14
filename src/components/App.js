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
    this.handleSearch =this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://practiceapi.devmountain.com/api/posts')
      .then(response => {
        this.setState({ posts: response.data })
      })
  }

  updatePost(id, text) {
    console.log(id)
  axios
  .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
  .then(request =>{
  this.setState({posts: request.data})

  })
  }

  deletePost(id) {
    // console.log(id)
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response => {
      console.log(response)
      this.setState({
        posts: this.state.posts.filter(post => post.id !== id)
      })
    })
  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data })
    })
  }
  handleSearch(e){
     axios
     .get('https://practiceapi.devmountain.com/api/posts')
     .then(value => {
       //console.log(value.data)
       var searchValue = value.data.filter(item => {
        return item.text.toLowerCase().match(e.toLowerCase())
       })

       this.setState({posts: searchValue})
     })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchApp ={this.handleSearch} />

        <section className="App__content">
        <Compose createPostFn={this.createPost} />

          {
         posts.map(post => (
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
    )
  }
}

export default App;