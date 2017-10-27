import React,{Component} from 'react';
import Button from 'material-ui/Button';
import {addLoginInfo,addUserInfo,removeLoginInfo} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import { withRouter } from 'react-router-dom';
//import CryptoJS from 'crypto-js';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

class Signin extends Component{

    state = {
        open:false,
        msg:''
    }
    
    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
    };

    render(){
        const { classes } = this.props;
        return(
                <div style={{margin:'10px'}}>
                    <form className="form-horizontal" action="">
                        <input 
                            type="email" 
                            className="form-control" 
                            name="inputEmail" 
                            id="inputEmail" 
                            placeholder="Email Id" 
                            required="required" 
                            style={{marginBottom:'10px'}}
                            //value={this.props.login.email} 
                            onChange={(event) => {
                                this.setState({...this.state,
                                    email: event.target.value
                                });
                                this.props.login.email= event.target.value;
                            }}>
                        </input>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="inputPassword" 
                            id="inputPassword" 
                            placeholder="Password"  
                            required="required"
                            style={{marginBottom:'10px'}}
                            //value={this.props.login.password}
                            onChange={(event) =>{
                                this.setState({...this.state,
                                    password: event.target.value
                                });
                                this.props.login.password= event.target.value;
                            }}>
                        </input>
                        <Button 
                            raised 
                            className="btn"
                            style={{marginBottom:'10px', width:'100%'}}
                            onClick={()=>{
                                if(!validateEmail(this.props.login.email)){
                                    this.setState({ open: true,msg:'INCORRECT EMAIL FORMAT' });
                                }
                                else if(this.props.login.password===undefined || this.props.login.password===""){
                                    this.setState({ open: true,msg:'EMPTY PASSWORD' });
                                }
                                else{
                                    this.props.addLoginInfo(
                                        this.props.login.email,
                                        this.props.login.password);
                                    console.log(this.props.login);
                                    API.doLogin(this.props.login)
                                    .then((data) => {
                                        //console.log(data);
                                        if(data.success==="1"){
                                            this.props.addUserInfo(data.email,data.firstname,data.userid,data.curdir);
                                            this.props.history.push('/home');
                                            console.log(this.props);
                                        }
                                        else if(data.success==='2'){
                                            this.setState({ open: true,msg:'User not found' });
                                        }
                                        else if(data.success==='3'){
                                            this.setState({ open: true,msg:'Wrong password' });
                                        }
                                        else{
                                            this.setState({ open: true,msg:'Try again' });
                                        }
                                    });    
                                }
                                this.props.removeLoginInfo();
                                this.props.history.push('/');
                            }}
                            >Sign in</Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.open}
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                                SnackbarContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">{this.state.msg}</span>}
                            /> 
                    </form>
                </div>  
        )
    }
    
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function mapDispatchToProps(dispatch){
    return{
        addLoginInfo: (email,password)=>dispatch(addLoginInfo(email,password)),
        addUserInfo: (email,firstname,userid,curdir)=>dispatch(addUserInfo(email,firstname,userid,curdir)),
        removeLoginInfo: ()=>dispatch(removeLoginInfo())
    };
}

const mapStateToProps= state =>{
    console.log(state.login);
    return{
        login: state.login 
    };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps,mapDispatchToProps) (Signin)));
