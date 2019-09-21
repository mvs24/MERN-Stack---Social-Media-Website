import React, { Component } from "react";
import { connect } from "react-redux";
import { searchUser } from "../../actions/userActions";

export class SearchedUser extends Component {
  componentDidMount() {
    this.props.searchUser({
      nameOfUser: this.props.match.params.searchedUserParam
    });
  }
  render() {
    //   not finished
    
    const searchedUser = this.props.user.searchedUser
      ? this.props.user.searchedUser
      : null;
    // console.log(searchedUser);
    
    if (!searchedUser) {
      return <div></div>;
    }
    return (
      <div>
        {searchedUser.map(user => (
          <div key={user._id}>{user.name}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchUser }
)(SearchedUser);
