import React, { Component } from "react";
import { connect } from "react-redux";
import MyImage from "../../assets/images/Marius.jpg";
import "./Profile.css";

export class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="left">
          <div className="img">
            <img className="image" src={MyImage} alt="" />
          </div>
          <div className="info">
            {this.props.user.user.name}
            <br />
            {this.props.post.postsUser ? (
              <span>Posts: {this.props.post.postsUser.length} </span>
            ) : null}
            Likes:{" "}
            {this.props.post.postsUser
              ? this.props.post.postsUser.reduce(function(acc, current) {
                  return acc + current.likes.length;
                }, 0) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

export default connect(mapStateToProps)(Profile);
