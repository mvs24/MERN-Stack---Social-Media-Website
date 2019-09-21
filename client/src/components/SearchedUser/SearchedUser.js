import React, { Component } from "react";
import { connect } from "react-redux";
import { searchUser } from "../../actions/userActions";
import UserCard from '../UserCard/UserCard'
import Navbar from '../Navbar/Navbar'

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
    console.log(searchedUser);
    
    if (!searchedUser) {
      return <div></div>;
    }
    return (
      <div>
        {" "}
        <Navbar />
        {searchedUser.map(user => (
          <UserCard
            key={user._id}
            name={user.name}
            lastname={user.lastname}
            userId={user._id}
          />
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
