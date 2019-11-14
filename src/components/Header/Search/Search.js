import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';
import axios from 'axios';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  constructor(){
    super();
    this.state={
      searchVal: ''
    }
  }

  handleChange(e){

    this.setState({
      searchVal:e
      
    })
    axios
   .get('http://localhost:9000/posts')
   .then(res =>{
    var searchItem = res.data.filter(item =>{
       return (
       item.text.toLowerCase().match(e.toLowerCase())
       )
     })
   
    this.props.search(searchItem)
   })
 }

  
  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
        <input placeholder="Search Your Feed" onChange ={(e)=> this.handleChange(e.target.value)}/>
          <MdSearch id="Search__icon" />
          
        </div>
      </section>
    );
  }
}
