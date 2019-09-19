import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "../../assets/images/Marius.jpg";


export class PostItem extends Component {
  render() {
    
    return (
      <div className='postItem'>
        <div>
          <img src={Image} alt="" />
          <div>
            <p>{this.props.individualPost.user.name}</p>
            <p>{this.props.individualPost.user.lastname}</p>
          </div>
          <span>{this.props.individualPost.text}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
