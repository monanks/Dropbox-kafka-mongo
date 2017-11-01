import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavigationHome extends Component{
    render(){
        return(
        <div className="row" style={nav}>
            <div className="col-md-2">
            </div>

            <div className="col-md-9">
                <div className="row" style={istyle}>
                    <img id="icon" style={logoStyle} alt="logo.svg" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"/>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/" style={lstyle} activeStyle={{ color: '#0070E0' }}>Home</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files" style={lstyle} activeStyle={{ color: '#0070E0' }}>Files</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/group" style={lstyle} activeStyle={{ color: '#0070E0' }}>My Groups</NavLink>
                </div>
            </div>
            <div className="col-md-1">
            </div>
        </div>
        )
    }
}

const istyle={
    marginTop: "30px",
    marginBottom: "30px"
}

const lstyle={
    fontSize: '17px',
    lineHeight: '16px',
    color: '#637282',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none',
    fontWeight:'100'
}
const linkStyle={
    marginTop: "25px",
    marginBottom: "25px"
}

const logoStyle={
    height: "32px",
    width: "32px"
}

const nav={
    backgroundColor: '#f7f9fa'
}
export default NavigationHome;