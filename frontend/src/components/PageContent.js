import React, {Component} from'react';
import Sidebar from './Sidebar';
import DisplayContent from './DisplayContent';

class PageContent extends Component{
    render(){
        return(
            <div>
                <div className="col-md-10">
                    <DisplayContent/>                    
                </div>
                <div className="col-md-2">
                    <Sidebar/>
                </div>
            </div>
        )
    }
}



export default PageContent;