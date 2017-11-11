import React, {Component} from'react';
import {addSharedFileList,closeFolder,changeSharedCurdir} from '../actions/action.js';
import {connect} from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import * as API from '../api/api';
import DeleteIcon from 'material-ui-icons/Delete';
import HOIcon from 'material-ui-icons/HighlightOff';
import DLIcon from 'material-ui-icons/GetApp';
import ShareIcon from 'material-ui-icons/Share'
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import FolderIcon from 'material-ui-icons/Folder';

var fileDownload = require('js-file-download');

class SharedContent extends Component{

    state={
        open:false
    };

    componentWillMount(){
        this.props.changeSharedCurdir('0','-1');
        this.getSharedFiles({userid:this.props.afterAuth.email,curdir:this.props.shared.curdir});
    }

    getSharedFiles = (payload) => {
        console.log('hello');
        console.log(payload);
        API.getSharedFiles(payload)
            .then((data) => {
                //console.log(data);
                if(data.status==="201"){
                    console.log(data.data);
                    this.props.addSharedFileList(data.data);
                    //this.state=data.files;
                }
                else{

                }
            });
    };


    previousFolder = () => {
        return (
            <div >
            <ListItem style={{marginLeft:'20px',marginRight:'20px'}} >
                <div className="row" style={lstyle}>
                    <div className="col-md-1">
                    <FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>
                    </div>
                    <div className="col-md-11" style={{overflow: 'hidden',textOverflow: 'ellipsis'}} onClick={()=>{
                            console.log("clicked");
                            if(this.props.shared.parentdir==='0'){
                                this.props.changeSharedCurdir('0','-1');
                                this.getSharedFiles({userid:this.props.afterAuth.email,curdir:'0'});
                            }
                            else{
                                API.getDirParent({dir:this.props.shared.parentdir})
                                .then((data)=>{
                                    this.props.changeSharedCurdir(this.props.afterAuth.parentdir,data.dir);
                                    this.getSharedFiles({userid:this.props.afterAuth.email,curdir:this.props.shared.curdir});
                                });
                            }
                        }}>
                    <a >..Go Back</a>
                    </div>
                </div>
            </ListItem>
            <Divider inset style={{marginLeft:'30px',marginRight:'50px'}}/>
        </div>)
    }

    addSharedFiles = () =>{
        if(this.props.file.sharedlist!==undefined){
            const var1 = this.props.file.sharedlist;
            console.log(var1);
            return var1.map(item=>(
                <div >
                    <ListItem disabled={false} style={{marginLeft:'20px',marginRight:'20px'}} id={item.fileid}  onMouseOver={()=>{
                        document.getElementById(item.fileid).style.background = "#ebf4fd";
                    }}
                    onMouseOut={()=>{
                        document.getElementById(item.fileid).style.background = "white";
                    }}>
                        <div className="row" style={lstyle}>
                            <div className="col-md-1" onClick={()=>{
                                    if(item.filetype==='1'){
                                        console.log("clicked");
                                        this.props.changeSharedCurdir(item.fileid,this.props.shared.curdir);
                                        this.getSharedFiles({userid:this.props.afterAuth.email,curdir:item.fileid});
                                    } 
                                }}>
                                {(item.filetype==='0')?<FileIcon style={{width:'50%',height:'50%',color:'#6c7a89',marginTop:'-5px'}}/>:<FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>}
                            </div>
                            <div className="col-md-3" style={{overflow: 'hidden',textOverflow: 'ellipsis'}} onClick={()=>{
                                    if(item.filetype==='1'){
                                        console.log("clicked");
                                        this.props.changeSharedCurdir(item.fileid,this.props.shared.curdir);
                                        this.getSharedFiles({userid:this.props.afterAuth.email,curdir:item.fileid});
                                    } 
                                }}>
                                {(item.filetype==='0')?
                                item.filename:
                                <a onHover>{item.filename}</a>}
                            </div>
                            <div className="col-md-1">
                                <Tooltip id="tooltip-icon" title={(item.star==='1'?"Unstar":"Star")} placement="bottom">
                                <IconButton style={{margin:'-12px'}}>
                                    {(item.star==='1')?<StarIcon style={{color:'#4994dd',width:'40%',height:'40%'}} onClick={()=>{this.setStar(item.fileid,'0')}}/>
                                    :<StarBorderIcon style={{color:'#4994dd',width:'40%',height:'40%'}} onClick={()=>{this.setStar(item.fileid,'1')}}/>}
                                </IconButton>
                                </Tooltip>
                            </div>
                            <div className="col-md-2">
                                {/* {item.datetime} */}
                                <Tooltip id="tooltip-icon" title={item.datetime} placement="bottom">
                                <p style={{fontWeight:'2px'}}>
                                {moment(item.datetime,"YYYY-MM-DD HH:mm:ss").fromNow()}
                                </p>
                                </Tooltip>
                            </div>
                            <div className="col-md-1">
                                
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                {(item.filetype==='0')?
                                <Tooltip id="tooltip-icon" title="Download" placement="bottom">
                                <IconButton style={{margin:'-12px'}}>
                                <DLIcon style={{width:'50%',height:'50%'}} onClick={()=>{
                                    console.log(item.fileid);
                                    API.dlFile({fileid: item.fileid,filepath:item.path})
                                    .then((data)=>{
                                        console.log(Buffer.from(data.data));
                                        fileDownload(Buffer.from(data.data),item.filename);
                                    })
                                }
                                }/></IconButton></Tooltip>:<div></div>}
                                
                            </div>
                            <div className="col-md-1">
                            <Tooltip id="tooltip-icon" title="Delete" placement="bottom">
                            <IconButton style={{margin:'-12px'}}>
                                <DeleteIcon style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                                    //console.log(item.fileid);
                                    var payload = {
                                        fileid: item.fileid,
                                        filepath:item.path,
                                        filetype:item.filetype,
                                        userid:this.props.afterAuth.userid,
                                        filename: item.filename
                                    };
                                    console.log(payload);
                                    // API.deleteFile(payload)
                                    // .then((data)=>{
                                    //     if(data.status==='201'){
                                    //         this.getFiles(this.props.afterAuth);
                                    //     }
                                        
                                    // })
                                }
                                } onFocus={()=>{console.log("hovering")}}/>
                            </IconButton>
                            </Tooltip>
                            </div>
                        </div>
                    </ListItem>
                    <Divider inset style={{marginLeft:'30px',marginRight:'50px'}}/>
                </div>
            ))
        } 
    }


    render(){
        return(
            <div className="col-md-10" >
                <div className="row">
                <List  >
                    <ListItem style={{marginLeft:'20px',marginRight:'20px'}} >
                        <div className="row" style={hstyle}>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-4">
                                Name
                            </div>
                            
                            <div className="col-md-3">
                                Shared
                            </div>
                            <div className="col-md-2">
                                
                            </div>
                            <div className="col-md-1">
                                
                            </div>
                            <div className="col-md-1">
                                <ListIcon style={{width:'40%',height:'40%'}}/>
                            </div>
                        </div>
                    </ListItem>
                    <Divider inset style={{marginLeft:'30px',marginRight:'50px'}}/>
                    {/*(this.props.shared.curdir!=='0')?this.previousFolder():<div></div>*/}
                    {this.addSharedFiles()}
                </List>
                
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
                </div>
                <div className="col-md-2">

                </div>
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
        folderstate: state.folderstate,
        shared: state.shared 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addSharedFileList: (filelist) =>dispatch(addSharedFileList(filelist)),
        //closeFolder: ()=> dispatch(closeFolder()),
        changeSharedCurdir: (dir,curdir)=> dispatch(changeSharedCurdir(dir,curdir))
    }
}
//export default withStyles(styles)(NavBar);
export default (connect(mapStateToProps,mapDispatchToProps)(SharedContent));