import React, { Component } from "react";
import { findPostById } from "../../actions/postAction";
import { connect } from "react-redux";
import "./Likes.css";
import Moment from "react-moment";

class Likes extends Component {
  componentDidMount() {
    this.props.findPostById(this.props.match.params.individualPost);
  }
  render() {
    const clickedPost = this.props.post.clickedPost
      ? this.props.post.clickedPost[0]
      : null;
      console.log(clickedPost)
    //   not finished
    if (!clickedPost) {
      return <div></div>;
    }
    return (
      <div className="postLike">
        <div className="left">
            <div>Post Info</div>
            <div>
               Date of post: <Moment format='LLL'>{clickedPost.date}</Moment>
            </div>
            <div>Number of comments: {clickedPost.comments.length}</div>
            <div>{clickedPost.text}</div>
        </div>
        <div className="right">
            Likes:........
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { findPostById }
)(Likes);
