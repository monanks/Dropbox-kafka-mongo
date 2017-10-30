import React, {Component} from'react';
import FileSidebar from './FileSidebar';
import Files from './Files';

class FileContent extends Component{
    render(){
        return(
            <div>
                <div className="col-md-10">
                    <Files/>                    
                </div>
                <div className="col-md-2">
                    <FileSidebar/>
                </div>
            </div>
        )
    }
}



export default FileContent;