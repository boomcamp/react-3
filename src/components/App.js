import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
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
    this.searchPost = this.searchPost.bind(this);
  }

  fetchData() {
    axios.get("http://localhost:9090/posts").then(results => {
      this.setState({ posts: results.data.reverse() });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  updatePost(id, text) {
    axios.put(`http://localhost:9090/posts/${id}`, { text }).then(() => {
      this.fetchData();
    });
  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`).then(() => {
      this.fetchData();
    });
  }

  createPost(text, date) {
    axios.post("http://localhost:9090/posts", { text, date }).then(() => {
      this.fetchData();
    });
  }
  searchPost(text) {
    axios
      .get(`http://localhost:9090/posts?q=${encodeURI(text)}`)
      .then(results => {
        this.setState({ posts: results.data.reverse });
      });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {posts.map(post => (
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
