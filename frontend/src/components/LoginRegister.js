import React ,{Component} from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Button from 'material-ui/Button';
import {NavLink} from 'react-router-dom';

const styles = theme => ({
    link: {
      margin: theme.spacing.unit,
      textDecoration: 'none'
    },
});
class LoginRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {
          signin: true
        }
    }
    render(){
        return(
            <div>
                <div className="col-md-8">
                    <img src="db.png" alt="db.png" style={style}/>
                </div>
                <div className="col-md-4" style={{backgroundColor:'#017de4',height:'100vh'}}>
                        {/* <div className="row" style={{marginLeft:'32%',marginBottom:'30%'}}>
                            {
                                this.state.signin
                                ? <div>SignIn or<Button  className={styles.button} onClick={() => this.onClick()}>Sign Up</Button></div>
                                : <div>SignUp or<Button  className={styles.button} onClick={() => this.onClick()}>Sign In</Button></div>
                            }
                        </div> */}
                        <div className="row" style={{textAlign:'center'}}>
                            {
                                this.state.signin
                                ? <div style={{fontSize:'20px'}}>SignIn or <NavLink to='/login' style={lnk} onClick={() => this.onClick()}>Sign Up</NavLink></div>
                                : <div style={{fontSize:'20px'}}>SignUp or <NavLink to='/login' style={lnk} onClick={() => this.onClick()}>Sign In</NavLink></div>
                            }
                        </div>
                        <div className="row" style={ftr}>
                            {
                                this.state.signin
                                ? <Signin />
                                : <Signup />
                            }
                        </div>
                </div>    
            </div>
        );
    }

    onClick(){
        this.setState({signin: !this.state.signin});
    }
}

const style ={
        marginTop: '20%',
        marginLeft: '20%',
        maxWidth: '50%',
        maxHeight: '50%',
        display: 'block'
}

const lnk={
    textDecoration:'none',
    color: 'white'
}

const ftr={
    position:'absolute',
    bottom:'0',
    width:'100%'
}
export default LoginRegister;


