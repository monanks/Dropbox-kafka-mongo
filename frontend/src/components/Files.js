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
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import StarIcon from 'material-ui-icons/Star';
import LinkIcon from 'material-ui-icons/Link';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import ShareIcon from 'material-ui-icons/Share'
import moment from 'moment';
import Modal from 'react-modal';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

var fileDownload = require('js-file-download');

//import IconButton from 'material-ui/IconButton';
class Files extends Component{

    state = {modalIsOpen: false,open:false,msg:''};

    componentWillMount(){
        this.props.changeCurdir('0','-1');
        this.getFiles(this.props.afterAuth);
    }

    componentDidMount(){
        // this.props.changeCurdir('0','-1');
        // this.getFiles(this.props.afterAuth);
        this.props.closeFolder();
    }

    setStar = (fileid, starvalue) =>{
        var payload= {
            fileid:fileid,
            star: starvalue
        }
        console.log('.................');
        console.log(payload);
        console.log('.................');
        API.setStar(payload)
        .then((data)=>{
            if(data.status==='201'){
                this.getFiles(this.props.afterAuth);
            }
        });
    }

    getFiles = (payload) => {
        console.log('hello');
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
                                        this.props.changeCurdir(item.fileid,this.props.afterAuth.curdir);
                                        this.getFiles({userid:this.props.afterAuth.userid,curdir:item.fileid});
                                    } 
                                }}>
                                {(item.filetype==='0')?<FileIcon style={{width:'50%',height:'50%',color:'#6c7a89',marginTop:'-5px'}}/>:<FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>}
                            </div>
                            <div className="col-md-3" style={{overflow: 'hidden',textOverflow: 'ellipsis'}} onClick={()=>{
                                    if(item.filetype==='1'){
                                        console.log("clicked");
                                        this.props.changeCurdir(item.fileid,this.props.afterAuth.curdir);
                                        this.getFiles({userid:this.props.afterAuth.userid,curdir:item.fileid});
                                    } 
                                }}>
                                {(item.filetype==='0')?
                                <h style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>{item.filename}</h>:
                                <a style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>{item.filename}</a>}
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
                                <Tooltip id="tooltip-icon" title="Share" placement="bottom">
                                <IconButton style={{margin:'-12px'}}>
                                    <ShareIcon style={{width:'50%',height:'50%',color:'#637282'}} onClick={()=>{
                                        this.setState({...this.state,modalIsOpen:true,item:item});
                                        console.log(this.state);
                                    }}/>
                                </IconButton>
                                </Tooltip>
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
                                    API.deleteFile(payload)
                                    .then((data)=>{
                                        if(data.status==='201'){
                                            this.getFiles(this.props.afterAuth);
                                        }
                                        
                                    })
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
                            if(this.props.afterAuth.parentdir==='0'){
                                this.props.changeCurdir('0','-1');
                                this.getFiles({userid:this.props.afterAuth.userid,curdir:'0'});
                            }
                            else{
                                API.getDirParent({dir:this.props.afterAuth.parentdir})
                                .then((data)=>{
                                    this.props.changeCurdir(this.props.afterAuth.parentdir,data.dir);
                                    this.getFiles({userid:this.props.afterAuth.userid,curdir:this.props.afterAuth.curdir});
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

    newFolder = () => {
        return (
            <div>
            <ListItem style={{marginLeft:'20px',marginRight:'20px'}}>
                <div className="row" style={lstyle}>
                    <div className="col-md-1">
                        <FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>
                    </div>
                    
                    
                    <div className="col-md-4">
                    <TextField
                        id="full-width"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onKeyDown = {(event)=>{if (event.keyCode === 13) {
                            var foldername = document.getElementById('full-width').value;

                            if(foldername!=="" && foldername!==undefined){
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
                            }
                            this.props.closeFolder();
                        }}}
                    />
                    </div>
                    <div className="col-md-2">
                        
                    </div>
                    <div className="col-md-3">
                        
                    </div>
                    <div className="col-md-1">
                    <Tooltip id="tooltip-icon" title="Create Folder" placement="bottom">
                    <IconButton style={{margin:'-12px'}}>
                        <CheckIcon id='btn' style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                            var foldername = document.getElementById('full-width').value;

                            if(foldername!=="" && foldername!==undefined){
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
                            }
                            this.props.closeFolder();
                        }
                        }/>
                    </IconButton>
                    </Tooltip>
                    </div>
                    <div className="col-md-1">
                    <Tooltip id="tooltip-icon" title="Cancel" placement="bottom">
                    <IconButton raised style={{margin:'-12px'}}>
                        <HOIcon style={{marginTop:'-2px',width:'50%',height:'50%'}} onClick={()=>{
                            this.props.closeFolder();
                        }
                        }/>
                    </IconButton>
                    </Tooltip>
                    </div>
                </div>
            </ListItem>
            <Divider inset style={{marginLeft:'30px',marginRight:'50px'}}/>
        </div>   
        )
    }

    afterOpenModal() {
        //this.subtitle.style.color = '#f00';
    }

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({...this.state, open: false });
    };

    render(){

        //style={{overflow:'scroll',overFlowY:'hidden!important',overFlowX:'hidden!important',position:'relative',maxHeight:'560px'}}
        if(this.props.file.list===undefined || (this.props.file.list.length===0 && this.props.afterAuth.curdir==='0')){
            return (
                <div>
                <div className="row" style={{fontSize:'18px',marginLeft:'0px',marginTop:'20px',height:'100%',width:'100%',textAlign:'center'}}>
                    Nothing To Show. Upload Some Files.
                </div>
                {this.props.folderstate ? this.newFolder():<div></div>}
                </div>
            );
        }else if((this.props.file.list) && this.props.file.list.length===0){
            return (
                <div>
                <div className="row" style={{fontSize:'18px',marginLeft:'0px',marginTop:'20px',height:'100%',width:'100%',textAlign:'center'}}>
                    Nothing To Show. Upload Some Files.
                </div>
                {this.props.folderstate ? this.newFolder():<div></div>}
                </div>
            );
        }
        
        return(
            <div className="row" >
                <List  >
                    <ListItem style={{marginLeft:'20px',marginRight:'20px'}} >
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
                    <Divider inset style={{marginLeft:'30px',marginRight:'50px'}}/>
                    {(this.props.afterAuth.curdir!=='0')?this.previousFolder():<div></div>}
                    {this.props.folderstate ? this.newFolder():<div></div>}
                    {this.addFiles()}
                </List>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
                contentLabel="Share"
                >   
                    {(this.state.modalIsOpen)?
                        <div>
                            <div className="row" style={{marginTop:'0px'}}>
                                <div className="col-md-2">
                                {(this.state.item.filetype==='0')?<FileIcon style={{width:'50%',height:'50%',color:'#6c7a89',marginTop:'-5px'}}/>:<FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>}
                                </div>
                                <div className="col-md-10">
                                {this.state.item.filename}
                                </div>     
                            </div>
                            <div className="row" style={{marginTop:'5px'}}>
                            <Divider inset style={{marginLeft:'0px',marginRight:'0px'}}/>
                            </div>
                            <div className="row" style={{marginTop:'10px'}}>
                                <div className="col-md-2">
                                <LinkIcon style={{width:'50%',height:'50%',color:'#6c7a89',margin:'5px'}}/>
                                </div>
                                <div className="col-md-10">
                                <TextField id="emailshare" placeholder="Email" underlinestyle={{display: 'none'}}/>
                                </div>     
                            </div>
                            <div className="row" style={{marginTop:'5px'}}>
                            <Divider inset style={{marginLeft:'0px',marginRight:'0px'}}/>
                            </div>

                            <div className="row" style={{position:'fixed',bottom:'0',marginBottom:'7px'}}>
                                <Divider inset style={{marginLeft:'0px',marginRight:'0px',marginBottom:'7px',width:'500px'}}/>
                                <Button style={{align:'left'}} onClick={()=>{this.setState({...this.state,modalIsOpen: false});}}>Close</Button>
                                <Button style={{align:'right'}} onClick={()=>{
                                        var emailshare = document.getElementById('emailshare').value;
                                        if(!validateEmail(emailshare)){
                                            this.setState({...this.state, open: true,msg:'ENTER VALID EMAILID' });
                                        }
                                        else{
                                            var payload = {
                                                emailshare: emailshare,
                                                fileid: this.state.item.fileid,
                                                userid: this.props.afterAuth.userid,
                                                filetype: this.state.item.filetype,
                                                filename: this.state.item.filename,
                                                filepath: this.state.item.path
                                            }; 
                                            API.shareFile(payload)
                                            .then((data)=>{
                                                console.log('helllllo'+data.status);
                                                this.setState({...this.state,modalIsOpen: false,open:true,msg:data.message});
                                            
                                            });
                                        }
                                    }
                                }>Share</Button>
                            </div>
                        </div>
                        :<div></div>
                    }
                    
                </Modal>
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
        )
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '400px',
      width                 : '500px',
      borderRadius          : '5px'
    }
};

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