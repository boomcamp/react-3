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
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:9090/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }

  updatePost(id, text) {
    const date = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    axios
      .put(`http://localhost:9090/posts/${id}`, { text, date })
      .then(response => {
        const updatedPost = response.data;
        const updatedPosts = this.state.posts.reverse().map(post => {
          if (post.id === updatedPost.id) {
            return { post, ...updatedPost };
          } else {
            return post;
          }
        });

        this.setState({ posts: updatedPosts });
      });
  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`).then(response => {
      this.setState({
        posts: this.state.posts.reverse().filter(post => post.id !== id)
      });
    });
  }

  createPost(text) {
    const date = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    if (text === "") {
      alert("please input some data");
    } else
      axios
        .post("http://localhost:9090/posts", { text, date })
        .then(results => {
          return axios.get("http://localhost:9090/posts").then(response => {
            this.setState({ posts: response.data });
          });
        });
  }
  handleSearch(element) {
    this.setState({ posts: element });
  }
  render() {
    return (
      <div className="App__parent">
        <Header searchDataMain={this.handleSearch} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {this.state.posts.reverse().map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
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
