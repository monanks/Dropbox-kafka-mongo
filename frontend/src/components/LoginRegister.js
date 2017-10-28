import React ,{Component} from 'react';
import Signin from './Signin';
import Signup from './Signup';
import {NavLink} from 'react-router-dom';

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
                        <div className="row" style={{textAlign:'center'}}>
                            {
                                this.state.signin
                                ? <div style={{fontSize:'20px',color:'white'}}>SignIn | <NavLink to='/login' style={lnk} onClick={() => this.onClick()}>SignUp</NavLink></div>
                                : <div style={{fontSize:'20px',color:'white'}}><NavLink to='/login' style={lnk} onClick={() => this.onClick()}>SignIn</NavLink> | SignUp</div>
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
    color: 'white',
    textShadow: '2px 1px darkblue'
}

const ftr={
    position:'absolute',
    //bottom:'0',
    marginTop:'35%',
    width:'100%'
}
export default LoginRegister;


