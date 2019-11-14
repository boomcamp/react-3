import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT
export default class Search extends Component {

  constructor(){
    super();

    this.state = {
      searchVal: ''
    };
    this.searchPostBtn = this.searchPostBtn.bind(this);
  }

  searchPost(searchVal){
    this.setState({ searchVal: searchVal})
  }

  searchPostBtn(){
    const { searchPostFn } = this.props;
    const { searchVal } = this.state;

    searchPostFn(searchVal);
  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.searchPost(e.target.value)}/>
          <MdSearch id="Search__icon" onClick={this.searchPostBtn}/>
        </div>
      </section>
    );
  }
}
