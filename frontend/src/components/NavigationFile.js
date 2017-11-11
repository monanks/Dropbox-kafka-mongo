import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import BackIcon from 'material-ui-icons/NavigateBefore';

class NavigationFile extends Component{
    render(){
        return(
        <div className="row">
            <div className="col-md-3">
            <div className="row" style={istyle}>
                    <NavLink to="/" style={hlstyle} activeStyle={{ color: '#99c6f3' }}>
                    <BackIcon id="icon" style={backStyle} />
                    </NavLink>
                    
                </div>
            </div>

            <div className="col-md-9">
                <div className="row" style={istyle}>
                    <NavLink to="/" style={hlstyle} activeStyle={{ color: '#0070E0' }}>
                    <img id="icon" style={logoStyle} alt="logo.svg" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg"/>
                    </NavLink>
                    
                </div>

                <div className="row" style ={hlinkStyle}>
                    <NavLink to="/files/myfiles" style={hlstyle} activeStyle={{color: '#0070E0'}}>Files</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files/myfiles" style={lstyle} activeStyle={astyle}>My Files</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files/shared" style={lstyle} activeStyle={astyle}>Sharing</NavLink>
                </div>

                <div className="row" style ={linkStyle}>
                    <NavLink to="/files/deleted" style={lstyle} activeStyle={astyle}>Deleted Files</NavLink>
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

const hlstyle={
    fontSize: '18px',
    lineHeight: '16px',
    color: 'blue',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none',
    marginLeft:'0px',
    marginRight:'-10px',
    
}
const hlinkStyle={
    marginTop: "25px",
    marginBottom: "40px"
}


const lstyle={
    fontSize: '15px',
    lineHeight: '16px',
    color: '#637282',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none'
}
const linkStyle={
    marginTop: "20px",
    marginBottom: "20px"
}

const logoStyle={
    height: "32px",
    width: "32px",
    
}

const backStyle={
    height: "24px",
    width: "24px",
    marginLeft:'35px',
    marginTop:'6px'
}

const astyle = { color: '#0070E0', fontWeight:'bold' };

export default NavigationFile;