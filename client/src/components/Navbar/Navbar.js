import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Navbar.css";
import { signOutUser } from "../../actions/userActions";

export class Navbar extends Component {
    
  signOut = () => {
    this.props.signOutUser(this.props.history);
  };

  render() {
    return (
      <div className="navbar">
        <div className="left">
          <h1>SCN</h1>
          <div>
            <input type="text" placeholder="Search your friends" />
            <a href="/home">
              <i className="fas fa-search icon"></i>
            </a>
          </div>
        </div>
        <div className="right">
          <div>
            <div className="rightLink fullname">
              <div
                style={{
                  marginRight: "20px"
                }}
                className="user"
              >
                Welcome {this.props.user.user.name.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="icons">
            <div className="rightLink">
              <Link className="iconLink" to="/home">
                <i className="fas fa-home"></i>
              </Link>
            </div>
            <div className="rightLink">
              <Link className="iconLink" to="/home">
                <i className="fas fa-envelope"></i>
              </Link>
            </div>
            <div className="rightLink">
              <Link className="iconLink" to="/home">
                <i className="fas fa-bell"></i>
              </Link>
            </div>
            <div className="rightLink">
              <Link className="iconLink" to="/home">
                <i className="fas fa-users"></i>
              </Link>
            </div>
            <div className="rightLink">
              <Link className="iconLink" to="/home">
                <i className="fas fa-cog"></i>
              </Link>
            </div>
            <div className="rightLink" onClick={this.signOut}>
              <Link className="iconLink" to="/home">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </div>
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
  { signOutUser }
)(withRouter(Navbar));
