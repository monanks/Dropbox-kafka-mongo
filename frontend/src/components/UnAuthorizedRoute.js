import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import * as API from '../api/api';
import {changeUserState} from '../actions/action.js';

class UnAuthorizedRoute extends Component {

  componentWillMount(){
    this.props.changeUserState(true,false);
    API.checkSession()
    .then((data)=>{
      if(data.status==='201'){
        this.props.changeUserState(false,true);
      }
      else{
        this.props.changeUserState(false,false);
      }
    });
  }
  
    render() {
      const { component: Component, ...rest } = this.props
      return (
        <Route {...rest} render={props => {
          if (this.props.userstate.pending===undefined || this.props.userstate.pending===true) return <div>...Loading...</div>
          return !(this.props.userstate.logged)
            ? <Component {...this.props} />
            : <Redirect to="/" />
        }} />
      )
    }
  }
  
  const mapStateToProps= state =>{
    return{
        afterAuth:state.afterAuth,
        userstate: state.userstate
    };
  }

  const mapDispatchToProps = dispatch =>{
    return{
        changeUserState: (p,l) =>dispatch(changeUserState(p,l))
    }
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(UnAuthorizedRoute)
  