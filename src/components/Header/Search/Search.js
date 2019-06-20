import React, { Component } from 'react';
import axios from 'axios';

import './Search.css';

import { MdSearch } from 'react-icons/md';
axios.defaults.headers.common['Content-Type'] = 'application/json';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     query: '',
  //     result: []
  //   };

  //   this.handleInputChange = this.handleInputChange.bind(this);
  // }

  // getInfo = () => {
  //   axios
  //     .get('https://practiceapi.devmountain.com/api/posts')
  //     .then(results => this.setState({ posts: results.data }));
  // }

  // handleInputChange = () => {
  //   this.setState({
  //     query: this.search.value
  //   }, () => {
  //     if(this.state.query && this.state.query.length > 0){
  //       // console.log(this);
  //       this.getInfo()
  //     }
  //   })
  // }

  render() {
    // const { query, result } = this.state;

    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" 
            // ref={input => this.search = input}
            // onChange={this.handleInputChange}
          />
          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
