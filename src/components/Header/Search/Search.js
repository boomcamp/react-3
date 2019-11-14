import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor(){
    super();
      this.state={
        text: '',
       }
       this.searchPost = this.searchPost.bind(this)
  }

  dataIn(value){
    this.setState({text: value})
  }

  searchPost(){
    // const { text } = this.state
    // const { searchPostFn } = this.props;

    this.props.searchPostFn(this.state.text);

  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange = {(e)=> this.dataIn(e.target.value)}/>

          <MdSearch id="Search__icon" onClick = {this.searchPost}/>
        </div>
      </section>
    );
  }
}
