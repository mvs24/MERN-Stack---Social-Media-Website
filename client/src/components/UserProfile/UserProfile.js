import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUserProfile, getUserProfilePosts } from "../../actions/userActions";
import MyImage from "../../assets/images/Marius.jpg";
import "./UserProfile.css";
import { requestFriend, getCurrentUser } from "../../actions/userActions";

export class UserProfile extends Component {
  state = {
    clicked: false
  };

  componentDidMount() {
    this.props.getCurrentUser();
    this.props.getUserProfile(this.props.match.params.userprofileId);
    this.props.getUserProfilePosts(this.props.match.params.userprofileId);
  }

  onClick = () => {
    this.props.requestFriend(this.props.user.userSearched._id);
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    let searchedUser = this.props.user.userSearched;
    let postsOfSearchedUser = this.props.user.userSearchedPosts;
    // console.log(searchedUser, postsOfSearchedUser);
    if (!searchedUser) {
      return <div></div>;
    }
    if (!postsOfSearchedUser) {
      return <div></div>;
    }

    return (
      <div>
        <Navbar />
        <div className="userProfile">
          <div className="leftColumn">
            <div>
              <img src={MyImage} alt="" />
              {this.props.user.currentUser.id ===
              this.props.user.userSearched._id ? (
                <span>Me</span>
              ) : (
                <span>
                  {searchedUser.name}
                  {searchedUser.lastname}
                </span>
              )}
            </div>
            <div className="information">
              <span className="posts">Posts: {postsOfSearchedUser.length}</span>
              <span className="likes">
                Likes:{" "}
                {postsOfSearchedUser.reduce(function(acc, current) {
                  return acc + current.likes.length;
                }, 0)}
              </span>
              <span className="friends">
                Friends: {searchedUser.friends.length}
              </span>
            </div>
            {this.props.user.currentUser.id ===
            this.props.user.userSearched._id ? null : this.state.clicked ? (
              <button onClick={this.onClick} className="addfriend">
                Requested
              </button>
            ) : (
              <button onClick={this.onClick} className="addfriend">
                Add Friend
              </button>
            )}
          </div>
          <div className="rightColumn"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserProfile, getUserProfilePosts, requestFriend, getCurrentUser }
)(UserProfile);
