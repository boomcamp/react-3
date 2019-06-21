import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      searchText: '',
    }
  }

  searchWord(searchText){
    this.setState({searchText})
    console.log(searchText)
  }

  render() {
    const { searchText } = this.state;
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" 
            value={searchText}
            onChange={e => this.searchWord(e.target.value)}/>

          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
