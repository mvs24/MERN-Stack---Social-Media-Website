import React, { Component } from "react";
import Image from "../../assets/images/Marius.jpg";
import "./UserCard.css";
import { Link } from "react-router-dom";


export class UserCard extends Component {
  render() {
    const newTo = {
      pathname: `/userprofile/${this.props.userId}`
    };
    return (
      <div>
    
        <div className="cardUser">
          <div className="imgContainer">
            <img src={Image} alt="" />
          </div>
          <div>
            <Link to={newTo} className="info">
              <div>{this.props.name}</div>
              <div style={{ marginLeft: "6px" }}>{this.props.lastname}</div>
            </Link>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default UserCard;
