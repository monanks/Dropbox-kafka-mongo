import React, {Component} from'react';
import {addFileList} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import FolderIcon from 'material-ui-icons/Folder';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import List, { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import DLIcon from 'material-ui-icons/GetApp';
var fileDownload = require('js-file-download');
//import IconButton from 'material-ui/IconButton';
class Files extends Component{

    componentDidMount(){
        this.getFiles();
    }

    getFiles = () => {
        console.log(this.props.afterAuth);
        API.getFiles(this.props.afterAuth)
            .then((data) => {
                //console.log(data);
                if(data.status==="201"){
                    this.props.addFileList(data.data);
                    //this.state=data.files;
                }
                else{

                }
            });
    };

    addFiles = () =>{
        if(this.props.file.list!==undefined){
            const var1 = this.props.file.list;
            console.log(var1);
            return var1.map(item=>(
                <div >
                    <ListItem >
                        <div className="row" style={lstyle}>
                            <div className="col-md-1">
                                {item.filetype?<FileIcon style={{width:'60%',height:'60%'}}/>:<FolderIcon style={{width:'60%',height:'60%'}}/>}
                            </div>
                            <div className="col-md-4" style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>
                                {item.filename}
                            </div>
                            
                            <div className="col-md-3">
                                {/* {item.datetime} */}
                                {item.datetime.substring(0,16)}
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                <DLIcon style={{width:'60%',height:'60%'}} onClick={()=>{
                                    console.log(item.fileid);
                                    API.dlFile({fileid: item.fileid,filepath:item.path})
                                    .then((data)=>{
                                        console.log(Buffer.from(data.data));
                                        fileDownload(Buffer.from(data.data),item.filename);
                                    })
                                }
                                }/>
                            </div>
                            <div className="col-md-1">
                                {/* <IconButton id={item.fileid} onclick={()=>{console.log('click')}}><DeleteIcon/></IconButton> */}
                                <DeleteIcon style={{marginTop:'-2px',width:'60%',height:'60%'}} onClick={()=>{
                                    console.log(item.fileid);
                                    API.deleteFile({fileid: item.fileid})
                                    .then((data)=>{
                                        this.getFiles();
                                    })
                                }
                                } onFocus={()=>{console.log("hovering")}}/>
                            </div>
                        </div>
                    </ListItem>
                </div>
            ))
        } 
    }

    
    render(){
        return(
            <div className="row" >
                <List>
                    <ListItem >
                        <div className="row" style={hstyle}>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-4">
                                Name
                            </div>
                            
                            <div className="col-md-3">
                                Uploaded
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                
                            </div>
                            <div className="col-md-1">
                                <ListIcon style={{width:'60%',height:'60%'}}/>
                            </div>
                        </div>
                    </ListItem>
                    {this.addFiles()}
                </List>
                
            </div>
        )
    }
}

const hstyle = {
    width: "100%",
    marginLeft:"0px",
    fontSize: '10px',
    fontWeight: '700',
    color: '#637282'
} 
const lstyle = {
    width: "100%",
    marginLeft: "0px",
    fontSize: '13px',
    fontWeight: '100',
    color: '#3d464d'
}

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth,
        file: state.file 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addFileList: (filelist) =>dispatch(addFileList(filelist))
    }
}
//export default withStyles(styles)(NavBar);
export default (connect(mapStateToProps,mapDispatchToProps)(Files));