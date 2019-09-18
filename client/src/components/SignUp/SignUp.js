import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { signUpUser } from "../../actions/userActions";

export class SignUp extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signUp = e => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      lastname: this.state.lastname
    };
    this.props.signUpUser(data, this.props.history);
  };

  render() {
    const { errors } = this.props.user;
    return (
      <div className="signIn-signUp">
        <div className="signIn">
          <div className="welcome">
            <div>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
            </div>
            <div className="signInBtnContainer">
              <Link to="/signIn">
                <button className="signInBtn">SIGN IN</button>
              </Link>
            </div>
          </div>
        </div>
        <form className="signUp" onSubmit={this.signUp}>
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create Account</h1>
            </div>
            <p className="createText">Complete all the fields to register</p>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                  placeholder="Name"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {errors ? (
                  <div className="error">
                    {errors.name ? <span>{errors.name}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.lastname}
                  onChange={this.onChange}
                  name="lastname"
                  placeholder="Lastname"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {errors ? (
                  <div className="error">
                    {errors.lastname ? <span>{errors.lastname}</span> : null}
                  </div>
                ) : null}
              </div>

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
                    {errors.email ? <span>{errors.email}</span> : null}
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
            <button className="signUpBtn" onClick={this.signUp}>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { signUpUser }
)(SignUp);
