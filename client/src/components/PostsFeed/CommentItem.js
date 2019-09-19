import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "../../assets/images/Marius.jpg";
import "./CommentItem.css";

export class CommentItem extends Component {
  render() {
    //   hours left ??? replies left
    const singleComment = this.props.comment;
    return (
      <div className="comment">
        <div className="name_lastname">
          <img src={Image} alt="" />
          <p className="name">{singleComment.name}</p>
          <p className="lastname">{singleComment.lastname}</p>
        </div>
        <span className="text2">{singleComment.text}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CommentItem);
