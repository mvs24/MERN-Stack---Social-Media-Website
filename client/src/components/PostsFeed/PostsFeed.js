import React, { Component } from "react";
import { connect } from "react-redux";
import "./PostsFeed.css";
import { addPost, fetchPosts, getPostsUser } from "../../actions/postAction";
import PostItem from "./PostItem";
import Moment from "moment";

export class PostsFeed extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let data = { text: this.state.text };
    this.props.addPost(data);
    this.props.getPostsUser(this.props.user.user.id);
  };

  render() {
    return (
      <div className="postfeed">
        <form onSubmit={this.onSubmit} action="" className="formPost">
          <textarea
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Got something to say?"
            name=""
            id=""
            cols="50"
            rows="3"
          ></textarea>
          <button disabled={this.state.text.length === 0} type="submit">
            Submit
          </button>
        </form>
        {this.props.post.allPosts.length > 0
          ? this.props.post.allPosts
              .slice(0)
              .reverse()
              .map(item => <PostItem key={item._id} individualPost={item} />)
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addPost, fetchPosts, getPostsUser }
)(PostsFeed);
