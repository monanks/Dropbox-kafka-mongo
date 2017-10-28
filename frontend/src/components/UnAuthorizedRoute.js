import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';

class UnAuthorizedRoute extends Component {
  
    render() {
      const { component: Component, ...rest } = this.props
      return (
        <Route {...rest} render={props => {
          return !(this.props.afterAuth.isLoggedin)
            ? <Component {...this.props} />
            : <Redirect to="/" />
        }} />
      )
    }
  }
  
  const mapStateToProps= state =>{
    return{
        afterAuth:state.afterAuth
    };
  }
  
  export default connect(mapStateToProps)(UnAuthorizedRoute)
  