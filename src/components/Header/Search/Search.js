import React, { Component } from "react";

import "./Search.css";

import { MdSearch } from "react-icons/md";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.searchPost = this.searchPost.bind(this);
  }
  searchPost(text) {
    const { searchPostFn } = this.props;
    searchPostFn(text);
  }
  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            placeholder="Search Your Feed"
            onChange={e => this.searchPost(e.target.value)}
          />

          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
