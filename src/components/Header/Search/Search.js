import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  search = (value) => {
    const { handleSearchFn } = this.props;
    handleSearchFn(value);
  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.search(e.target.value)}/>

          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
