import React,{Component} from 'react';
import {connect} from 'react-redux';

class AccountContent extends Component{
    render(){
        return(
            <div>
                <div className="row">
                    email: {this.props.afterAuth.email}
                </div>
                <div className="row">
                    Name: {this.props.afterAuth.name}
                </div>
            </div>
        )
    }
}

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth
    };
}


export default (connect(mapStateToProps)(AccountContent));