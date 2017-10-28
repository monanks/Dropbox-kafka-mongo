import React, {Component} from'react';
import FaceIcon from 'material-ui-icons/Face';
import ExitIcon from 'material-ui-icons/ExitToApp';
import IconButton from 'material-ui/IconButton';
import {removeUserInfo,resetState} from '../actions/action.js';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as API from '../api/api';

class Header extends Component{

    render(){
        return(
            <div style={boxstyle}>
                <div className="col-md-10" style={hstyle}>
                    {this.props.title}
                </div>
                <div className="col-md-2">
                
                <IconButton onClick={()=>{
                    this.props.history.push('/account');
                }
                }>
                    <FaceIcon/>
                </IconButton>
                <IconButton onClick={()=>{
                    this.props.removeUserInfo();
                    API.doSignout()
                    .then((data)=>{
                        if(data.status==='201'){
                            localStorage.clear();
                            this.props.history.push('/login');
                        }
                    });    
                }
                }>
                    <ExitIcon/>
                </IconButton>
                </div>
            </div>
        )
    }
}

const boxstyle={
    marginTop: "30px",
    marginLeft: "20px"
}

const hstyle={
    fontSize: "20px"
}
function mapDispatchToProps(dispatch){
    return{
        removeUserInfo: ()=>dispatch(removeUserInfo()),
        resetState: ()=>dispatch(resetState())
    };
}

export default withRouter(connect(null,mapDispatchToProps) (Header));