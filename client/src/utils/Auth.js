import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedClass, reload) {
  class Auth extends Component {
   
    componentDidMount() {
     if(this.props.user.user && reload===false){
        this.props.history.push('/home')
     }
    }

    render() {
     
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps)(Auth);
}
