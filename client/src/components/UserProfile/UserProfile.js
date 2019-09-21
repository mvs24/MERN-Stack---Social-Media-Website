import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUserProfile, getUserProfilePosts } from "../../actions/userActions";

export class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userprofileId);
    this.props.getUserProfilePosts(this.props.match.params.userprofileId);
  }
  render() {
    console.log(this.props.user.userSearched)
    console.log(this.props.user.userSearchedPosts)
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
  mapStateToProps,
  { getUserProfile, getUserProfilePosts }
)(UserProfile);
