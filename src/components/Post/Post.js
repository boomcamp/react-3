import React, { Component } from 'react';
import {
  MdPersonOutline,
  MdMoreVert,
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdMailOutline,
} from 'react-icons/md';

import './Post.css';

import Edit from './Edit/Edit';

export default class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false,
    };

    this.hideEdit = this.hideEdit.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.toggleMasterMenu = this.toggleMasterMenu.bind(this);
    this.hideMasterMenu = this.hideMasterMenu.bind(this);
  }

  showEdit() {
    this.setState({ editing: true, showMasterMenu: false });
  }
  hideEdit() {
    this.setState({ editing: false });
  }
  toggleMasterMenu() {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }
  hideMasterMenu() {
    if (this.state.showMasterMenu === true) {
      this.setState({ showMasterMenu: false });
    }
  }

   render() {
    const { editing, showMasterMenu } = this.state;
    const { text, date, updatePostFn, deletePostFn, id } = this.props;

    return (
      <section className="Post__parent" onClick={this.hideMasterMenu}>
        {}
        <div className="Post__master-controls">
          <MdMoreVert onClick={this.toggleMasterMenu} />
          <div
              className="Post__master-menu"
              style={{ display: showMasterMenu ? 'flex' : 'none' }}
            >              
              <span onClick={this.showEdit}>Edit</span>
              <span onClick={() => deletePostFn(id)}>Delete</span>
               
            </div>
        </div>
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <MdPersonOutline />
          </div>
          <span className="Post__name">Boom.Camp</span>
          <span className="Post__handle">@boom.camp</span>
          <span className="Post__date">- {date}</span>
        </div>
        <div className="Post__content">
          {
          editing ? (
            <Edit text={text} id={id} hideEdit={this.hideEdit} updatePostFn={updatePostFn} />
          ) : (
            <span className="Post__text">{text}</span>
          )}
        </div>
        <div className="Post__user-controls">
          <MdChatBubbleOutline className="Post__control-icon" />
          <MdFavoriteBorder className="Post__control-icon" />
          <MdMailOutline className="Post__control-icon" />
        </div>
      </section>
    );
  }
}
