import React, {Component} from'react';
import Header from './Header';
import SharedContent from './SharedContent';
import NavigationFile from './NavigationFile';
class Shared extends Component{
    render(){
        return(
            <div className="row ">
                <div className="col-md-2" style={navstyle}>
                    <NavigationFile/>
                </div>
                <div className="col-md-10">
                        <div className="row">
                            <Header title="Sharing"/>
                        </div>
                        <div className="row">
                            <SharedContent/>
                        </div>
                </div>
            </div>
        )
    }
}

const navstyle={
    backgroundColor:'#f7f9fa',
    height:'100vh'
}

export default Shared;