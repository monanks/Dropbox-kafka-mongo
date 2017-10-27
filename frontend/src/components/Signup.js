import React,{Component} from 'react';
import Button from 'material-ui/Button';
import {addSignupInfo,addUserInfo,removeSignupInfo} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import { withRouter } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

class Signup extends Component{

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
                        //value={this.props.email}
                        onChange={(event)=>{
                            this.setState({...this.state,
                                email:event.target.value
                            });
                            this.props.register.email=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="inputFirstname" 
                        id="inputFirstname" 
                        placeholder="First Name" 
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.first}
                        onChange={(event)=>{
                            this.setState({...this.state,
                                first:event.target.value
                            });
                            this.props.register.firstname=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="inputLastname" 
                        id="inputLastname" 
                        placeholder="Last Name" 
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.last}
                        onChange={(event)=>{
                            this.setState({...this.state,
                                last:event.target.value
                            });
                            this.props.register.lastname=event.target.value;
                        }}
                        ></input>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="inputPassword" 
                        id="inputPassword" 
                        placeholder="Password"
                        required="required"
                        style={{marginBottom:'10px'}}
                        //value={this.props.password}
                        onChange={(event)=>{
                            this.setState({...this.state,
                                password:event.target.value
                            });
                            this.props.register.password=event.target.value;
                        }}
                        ></input>
                    <Button 
                    raised 
                    className="btn"
                    style={{marginBottom:'10px', width:'100%'}}
                    onClick={() => {
                        if(!validateEmail(this.props.register.email)){
                            this.setState({ open: true,msg:'INCORRECT EMAIL FORMAT' });
                        }
                        else if(this.props.register.password===undefined ||this.props.register.password==="" ||
                            this.props.register.firstname===undefined || this.props.register.firstname==="" ||
                            this.props.register.lastname===undefined  || this.props.register.lastname===""                      
                        ){
                            console.log(this.props.register);
                            this.setState({ open: true,msg:'EMPTY FIELDS' });
                        }
                        else{
                            this.props.addSignupInfo(
                                this.props.register.email,
                                this.props.register.password,
                                this.props.register.firstname,
                                this.props.register.lastname);
                            //console.log(this.props.register);
                            API.doSignup(this.props.register)
                            .then((data) => {
                                console.log(data);
                                if(data.success==="1"){
                                    this.props.addUserInfo(data.email,data.first,data.userid,data.curdir);
                                    this.props.history.push('/home');
                                    this.props.removeSignupInfo();
                                }
                                else if(data.success==='2'){
                                    this.setState({ open: true,msg:'User already exists' });
                                }
                                else if(data.success==='3'){
                                    this.setState({ open: true,msg:'Wrong password' });
                                }
                                else{
                                    this.setState({ open: true,msg:'Try again' });
                                }
                            });
                        }
                        this.props.removeSignupInfo();
                        this.props.history.push('/');
                    }}
                    >Sign Up</Button>
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

Signup.propTypes = {
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
        addSignupInfo : (email,password,first,last) => dispatch(addSignupInfo(email,password,first,last)),
        addUserInfo: (email,firstname,userid,curdir)=>dispatch(addUserInfo(email,firstname,userid,curdir)),
        removeSignupInfo: ()=>dispatch(removeSignupInfo())
    };
}

const mapStateToProps= state =>{
    console.log(state.register);
    return{
        register:state.register 
    };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps,mapDispatchToProps) (Signup)));

