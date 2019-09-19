import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "../../assets/images/Marius.jpg";
import "./PostItem.css";
import { addComment } from "../../actions/postAction";
import CommentItem from "./CommentItem";

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

  reverseArray(arr) {
    return arr.splice(0).reverse();
  }

  render() {
    // hours left?????????????????????????????????
    return (
      <div className="postItem">
        <div className="singlePost">
          <div className="name_lastname">
            <img src={Image} alt="" />
            <p className="name">{this.props.individualPost.user.name}</p>
            <p className="lastname">
              {this.props.individualPost.user.lastname}
            </p>
          </div>
          <span className="text">{this.props.individualPost.text}</span>
          <form onSubmit={this.onSubmit}>
            <div>
              <span className="comments" onClick={this.changeArea}>
                Comments
              </span>

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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addComment }
)(PostItem);
