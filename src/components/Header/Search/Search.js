import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  sendQuery = (query) => {
     const {searchPostFn} = this.props;
     searchPostFn(encodeURI(query));
  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input onChange={(e)=>this.sendQuery(e.target.value)} placeholder="Search Your Feed" />

          <MdSearch id="Search__icon" />
        </div>
      </section>
    );
  }
}
