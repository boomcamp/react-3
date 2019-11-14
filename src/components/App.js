import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import { MdRotate90DegreesCcw } from "react-icons/md";
import Post from "./Post/Post";

axios.defaults.headers.common["Content-Type"] = "application/json";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleSearch =this.handleSearch.bind(this);

  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/posts")
      .then(response => {
        this.setState({ posts: response.data });
      });
  }

  updatePost(id, text) {
    axios.put(`http://localhost:9000/posts/${id}`, { text }).then(response => {
      const updatePost = response.data;

      const updatePosts = this.state.posts.reverse().map(post => {
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
    .delete(`http://localhost:9000/posts/${id}`).then(response => {
      this.setState({
        posts: this.state.posts.reverse().filter(post => post.id !== id)
      });
    });
  }

  createPost(text) {
      if(text === ''){
        alert('empty')
      }else{
     const date = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
   
    axios.post('http://localhost:9000/posts', { text, date }).then( results => {
      axios.get('http://localhost:9000/posts')
      .then(response => {
        this.setState({ posts: response.data });
      });
  });
  }
}
  handleSearch(search){
    this.setState({posts: search})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
      <Header  searchMain ={this.handleSearch}/>
  

        <section className="App__content">
        <Compose createPostFn={this.createPost} />
          {posts.reverse().map(post => (
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
