import React,{Component} from 'react';
import Button from 'material-ui/Button';
import {addLoginInfo,addUserInfo,removeLoginInfo} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import { withRouter } from 'react-router-dom';
//import CryptoJS from 'crypto-js';
import Snackbar from 'material-ui/Snackbar';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CryptoJS from 'crypto-js';

class Signin extends Component{

    state = {
        open:false,
        msg:'',
        username:'',
        password:''
    }
    
    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
    };

    render(){
        //const { classes } = this.props;
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
                                    username: event.target.value
                                });
                                //this.props.login.email= event.target.value;
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
                                //this.props.login.password= event.target.value;
                            }}>
                        </input>
                        <Button 
                            raised 
                            className="btn"
                            style={{marginBottom:'10px', width:'100%'}}
                            onClick={()=>{
                                if(!validateEmail(this.state.username)){
                                    this.setState({ open: true,msg:'ENTER VALID EMAILID' });
                                }
                                else if(this.state.password===undefined || this.state.password===""){
                                    this.setState({ open: true,msg:'EMPTY PASSWORD' });
                                }
                                else{
                                    this.props.addLoginInfo(
                                        this.state.username,
                                        this.state.password);
                                    console.log(this.props);
                                    var payload = {
                                        username: this.state.username,
                                        password: CryptoJS.AES.encrypt(this.state.password,'273').toString()
                                    }
                                    console.log(payload);
                                    API.doLogin(payload)
                                    .then((data) => {
                                        //console.log(data);
                                        if(data.status==="201"){
                                            this.props.addUserInfo(data.email,data.firstname,data.id,data.curdir,data.parentdir);
                                            this.props.history.push('/');
                                            console.log(this.props);
                                        }
                                        else if(data.status==='202'){
                                            this.setState({ open: true,msg:data.message });
                                        }
                                        else if(data.status==='203'){
                                            this.setState({ open: true,msg:data.message });
                                        }
                                        else{
                                            this.setState({ open: true,msg:'Try again' });
                                        }
                                    });    
                                }
                                //this.props.removeLoginInfo();
                                //this.props.history.push('/');
                            }}
                            >Sign in</Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                open={this.state.open}
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                                SnackbarContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span style={{textSize:'20px'}} id="message-id">{this.state.msg}</span>}
                            /> 
                    </form>
                </div>  
        )
    }
    
}

// Signin.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

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
        addUserInfo: (email,firstname,userid,curdir,parentdir)=>dispatch(addUserInfo(email,firstname,userid,curdir,parentdir)),
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
