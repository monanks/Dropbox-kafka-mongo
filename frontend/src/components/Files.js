import React, {Component} from'react';
import {addFileList,closeFolder,changeCurdir} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import FolderIcon from 'material-ui-icons/Folder';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import List, { ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import HOIcon from 'material-ui-icons/HighlightOff';
import DLIcon from 'material-ui-icons/GetApp';
import CheckIcon from 'material-ui-icons/Check';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

var fileDownload = require('js-file-download');

//import IconButton from 'material-ui/IconButton';
class Files extends Component{

    componentDidMount(){
        this.getFiles(this.props.afterAuth);
    }

    getFiles = (payload) => {
        console.log(payload);
        API.getFiles(payload)
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
                                {(item.filetype==='0')?<FileIcon style={{width:'50%',height:'50%'}}/>:<FolderIcon style={{width:'60%',height:'60%',color:'#0070e0'}}/>}
                            </div>
                            <div className="col-md-4" style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>
                                {(item.filetype==='0')?
                                item.filename:
                                <a onClick={()=>{
                                    console.log("clicked");
                                    this.props.changeCurdir(item.fileid,this.props.afterAuth.curdir);
                                    this.getFiles({userid:this.props.afterAuth.userid,curdir:item.fileid});
                                }}>{item.filename}</a>}
                            </div>
                            
                            <div className="col-md-3">
                                {/* {item.datetime} */}
                                {item.datetime.substring(0,16)}
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                {(item.filetype==='0')?
                                <DLIcon style={{width:'50%',height:'50%'}} onClick={()=>{
                                    console.log(item.fileid);
                                    API.dlFile({fileid: item.fileid,filepath:item.path})
                                    .then((data)=>{
                                        console.log(Buffer.from(data.data));
                                        fileDownload(Buffer.from(data.data),item.filename);
                                    })
                                }
                                }/>:<div></div>}
                                
                            </div>
                            <div className="col-md-1">
                                {/* <IconButton id={item.fileid} onclick={()=>{console.log('click')}}><DeleteIcon/></IconButton> */}
                                <DeleteIcon style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                                    //console.log(item.fileid);
                                    var payload = {fileid: item.fileid, filepath:item.path, filetype:item.filetype};
                                    console.log(payload);
                                    API.deleteFile(payload)
                                    .then((data)=>{
                                        if(data.status==='201'){
                                            this.getFiles(this.props.afterAuth);
                                        }
                                        
                                    })
                                }
                                } onFocus={()=>{console.log("hovering")}}/>
                            </div>
                        </div>
                    </ListItem>
                    <Divider inset />
                </div>
            ))
        } 
    }

    previousFolder = () => {
        return (
            <div >
            <ListItem >
                <div className="row" style={lstyle}>
                    <div className="col-md-1">
                    <FolderIcon style={{width:'60%',height:'60%'}}/>
                    </div>
                    <div className="col-md-11" style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>
                    <a onClick={()=>{
                            console.log("clicked");
                            this.props.changeCurdir('0','-1');
                            this.getFiles({userid:this.props.afterAuth.userid,curdir:'0'});
                        }}>..</a>
                    </div>
                </div>
            </ListItem>
            <Divider inset />
        </div>)
    }

    newFolder = () => {
        return (
            <div>
            <ListItem >
                <div className="row" style={lstyle}>
                    <div className="col-md-1">
                        <FolderIcon style={{width:'50%',height:'50%'}}/>
                    </div>
                    
                    
                    <div className="col-md-4">
                    <TextField
                        id="full-width"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                    </div>
                    <div className="col-md-2">
                        
                    </div>
                    <div className="col-md-3">
                        
                    </div>
                    <div className="col-md-1">
                        {/* <IconButton id={item.fileid} onclick={()=>{console.log('click')}}><DeleteIcon/></IconButton> */}
                        <CheckIcon style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                            
                            var payload = {
                                foldername:document.getElementById('full-width').value,
                                userid: this.props.afterAuth.userid,
                                curdir: this.props.afterAuth.curdir
                            };
                            console.log(payload);
                            API.createFolder(payload)
                            .then((data)=>{
                                if(data.status==='201'){
                                    this.getFiles(this.props.afterAuth);
                                }
                                else{

                                }
                            });
                            this.props.closeFolder();
                        }
                        }/>
                    </div>
                    <div className="col-md-1">
                        {/* <IconButton id={item.fileid} onclick={()=>{console.log('click')}}><DeleteIcon/></IconButton> */}
                        <HOIcon style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                            this.props.closeFolder();
                        }
                        }/>
                    </div>
                </div>
            </ListItem>
            <Divider inset />
        </div>   
        )
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
                                <ListIcon style={{width:'50%',height:'50%'}}/>
                            </div>
                        </div>
                    </ListItem>
                    <Divider inset />
                    {(this.props.afterAuth.curdir!=='0')?this.previousFolder():<div></div>}
                    {this.props.folderstate ? this.newFolder():<div></div>}
                    {this.addFiles()}
                </List>
                
            </div>
        )
    }
}

const hstyle = {
    width: "100%",
    marginLeft:"0px",
    fontSize: '14px',
    fontWeight: '400',
    color: '#637282'
} 
const lstyle = {
    width: "100%",
    marginLeft: "0px",
    fontSize: '14px',
    fontWeight: '100',
    color: '#3d464d',
    marginTop:'10px'
}

const mapStateToProps= state =>{
    console.log(state.afterAuth);
    return{
        afterAuth: state.afterAuth,
        file: state.file,
        folderstate: state.folderstate 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addFileList: (filelist) =>dispatch(addFileList(filelist)),
        closeFolder: ()=> dispatch(closeFolder()),
        changeCurdir: (dir,curdir)=> dispatch(changeCurdir(dir,curdir))
    }
}
//export default withStyles(styles)(NavBar);
export default (connect(mapStateToProps,mapDispatchToProps)(Files));