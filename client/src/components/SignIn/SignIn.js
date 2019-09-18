import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signInUser } from "../../actions/userActions";

export class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signIn = e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signInUser(data, this.props.history);
  };

  render() {
    const errors = this.props.user.loginError;
    return (
      <div className="signIn-signUp">
        <form className="signUp" onSubmit={this.signIn}>
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Sign in to Social Network</h1>
            </div>

            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <i className="fas fa-envelope icon"></i>
                {errors ? (
                  <div className="error">
                    {errors.user ? <span>{errors.user}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <i className="fas fa-lock icon"></i>
                {errors ? (
                  <div className="error">
                    {errors.password ? <span>{errors.password}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
            <button className="signUpBtn" onClick={this.signIn}>
              SIGN IN
            </button>
          </div>
        </form>
        <div className="signIn">
          <div className="welcome">
            <div>
              <h1>Hello, Friend!!</h1>
              <p>Enter your personal details and start journey with us</p>
            </div>
            <div className="signInBtnContainer">
              <Link to="/">
                <button className="signInBtn">SIGN UP</button>
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
  { signInUser }
)(SignIn);
