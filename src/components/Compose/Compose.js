import React, { Component } from "react";
import { MdPersonOutline } from "react-icons/md";

import "./Compose.css";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Compose extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      composeBtn: false
    };

    this.createPost = this.createPost.bind(this);
    this.showComposeBtn = this.showComposeBtn.bind(this);
    this.hideComposeBtn = this.hideComposeBtn.bind(this);
  }
  showComposeBtn() {
    this.setState({
      composeBtn: true
    });
  }
  hideComposeBtn() {
    if (!this.state.text) {
      this.setState({
        composeBtn: false
      });
    }
  }

  updateText(text) {
    this.setState({ text });
  }

  createPost() {
    const { text } = this.state;
    const { createPostFn } = this.props;
    const date = new Date();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const new_date =
      month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    createPostFn(text, new_date);
    this.setState({ text: "", composeBtn: false });
  }

  render() {
    // Destructuring
    const { text } = this.state;

    return (
      <section className="Compose__parent">
        <div className="Compose__top">
          <div className="Compose__profile-picture">
            <MdPersonOutline />
          </div>

          {/* This is where you type the message for your new post */}
          <input
            className="Compose__input"
            placeholder="What's on your mind?"
            value={text}
            onChange={e => this.updateText(e.target.value)}
            onFocus={this.showComposeBtn}
            onBlur={this.hideComposeBtn}
          />
        </div>

        {this.state.composeBtn ? (
          <div className="Compose__bottom">
            <button onClick={this.createPost}>Compose</button>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    );
  }
}
