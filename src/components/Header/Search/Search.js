import React, { Component } from "react";
import axios from "axios";
import "./Search.css";

import { MdSearch } from "react-icons/md";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }
  handleChange(e) {
    this.setState({
      searchValue: e
    });
    axios.get("http://localhost:9090/posts").then(response => {
      var searchData = response.data.filter(item => {
        return item.text.toLowerCase().match(e.toLowerCase());
      });
      this.props.search(searchData);
    });
  }
  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            placeholder="Search Your Feed"
            onChange={e => this.handleChange(e.target.value)}
          />
          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
