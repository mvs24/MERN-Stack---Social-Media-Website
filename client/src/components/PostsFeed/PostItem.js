import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "../../assets/images/Marius.jpg";
import "./PostItem.css";
import { addComment } from "../../actions/postAction";
import CommentItem from "./CommentItem";
import Moment from "react-moment";
import { addLikeToComment, getPostsUser } from "../../actions/postAction";
import { Link } from "react-router-dom";

export class PostItem extends Component {
  state = {
    openComments: false,
    comment: ""
  };

  onSubmit = e => {
    e.preventDefault();
    let data = {
      commentText: this.state.comment
    };
    this.props.addComment(data, this.props.postId);
  };

  onChangeText = e => {
    this.setState({
      comment: e.target.value
    });
  };

  changeArea = () => {
    this.setState({
      openComments: !this.state.openComments
    });
  };

  likePost = id => {
    this.props.addLikeToComment(id);
    this.props.getPostsUser(this.props.user.user.id);
  };

  render() {
    const newTo = { 
      pathname: `${this.props.individualPost._id}` 
    };
    return (
      <div className="postItem">
        <div className="singlePost">
          <div className="name_lastname">
            <img src={Image} alt="" />
            <p className="name">{this.props.individualPost.user.name}</p>
            <p className="lastname">
              {this.props.individualPost.user.lastname}
            </p>
            <Moment
              style={{ fontSize: "13px", color: "gray", marginLeft: "20px" }}
              format="LLL"
            >
              {this.props.individualPost.date}
            </Moment>
          </div>
          <span className="text">{this.props.individualPost.text}</span>
          <form onSubmit={this.onSubmit}>
            <div>
              <span className="comments" onClick={this.changeArea}>
                Comments ({this.props.individualPost.comments.length})
              </span>

              <span
                onClick={() => this.likePost(this.props.individualPost._id)}
                style={{ marginLeft: "300px" }}
                className="comments"
              >
                Like ({this.props.individualPost.likes.length})
              </span>
             
              <Link
               
                to={newTo}
              >
                <i className="fas fa-arrow-right"></i>
              </Link>
              {this.state.openComments && (
                <div className="allComment">
                  <div className="commentPart">
                    <textarea
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        marginLeft: "20px"
                      }}
                      onChange={this.onChangeText}
                      value={this.state.comment}
                      cols="70"
                      rows="2"
                    ></textarea>

                    <button
                      style={{ marginTop: "20px", height: "30px" }}
                      disabled={this.state.comment.length === 0}
                      onClick={this.onSubmit}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>{" "}
                  {this.state.openComments &&
                    this.props.individualPost.comments.length > 0 &&
                    this.props.individualPost.comments
                      .slice(0)
                      .reverse()
                      .sort((a, b) => {
                        let d1 = new Date(a.date);
                        let d2 = new Date(b.date);
                        return d2 - d1;
                      })
                      .map(item => (
                        <CommentItem key={item._id} comment={item} />
                      ))}
                </div>
              )}
            </div>
          </form>
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
  { addComment, addLikeToComment, getPostsUser }
)(PostItem);
