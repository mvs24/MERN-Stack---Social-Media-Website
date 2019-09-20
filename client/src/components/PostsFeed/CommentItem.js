import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "../../assets/images/Marius.jpg";
import "./CommentItem.css";
import Moment from 'react-moment'

export class CommentItem extends Component {
  render() {
    //   hours left ??? replies left
    const singleComment = this.props.comment;
    // console.log(singleComment);
    return (
      <div className="comment">
        <div className="name_lastname">
          <img src={Image} alt="" />
          <p className="name">{singleComment.username}</p>
          <p className="lastname">{singleComment.lastname}</p>
          <Moment
            style={{ fontSize: "13px", color: "gray", marginLeft: "20px" }}
            format="LLL"
          >
            {singleComment.date}
          </Moment>
        </div>
        <span className="text2">{singleComment.text}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CommentItem);
