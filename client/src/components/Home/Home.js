import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Profile from "../Profile/Profile";
// import Posts from '../Posts/Posts'
import "./Home.css";
import { getPostsUser } from "../../actions/postAction";
import PostsFeed from '../PostsFeed/PostsFeed'

export class Home extends Component {
  componentDidMount() {
    this.props.getPostsUser(this.props.user.user.id);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="homePage">
          <div className="profile">
            <Profile />
          </div>
          <div className='posts'>
            <PostsFeed/>
          </div>
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
  { getPostsUser }
)(Home);
