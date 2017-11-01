import React,{Component} from 'react';
import Button from 'material-ui/Button';
//import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//import SharedFolderIcon from 'material-ui-icons/FolderShared';
import FolderIcon from 'material-ui-icons/FolderOpen';
import * as API from '../api/api.js';
import {connect} from 'react-redux';
import {addFileList,createFolder} from '../actions/action.js';
//mport FileIcon from 'material-ui-icons/InsertDriveFile';

class FileSidebar extends Component{

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

    render(){
        return(
            <div style={{marginTop:'25px'}}>
                <div className="row">
                    <label htmlFor="ufile" style={cfu}>
                        <i className="fa fa-cloud-upload" style={{backgroundColor:"#0070e0"}}></i>
                        Upload File
                    </label>
                    <input id="ufile" name='ufile' type="file" style={{display:'none'}} onChange={(event)=>{
                        const payload = new FormData();
                        console.log(this.props.afterAuth.userid);
                        payload.append("file", event.target.files[0]);
                        payload.append("curdir", this.props.afterAuth.curdir);
                        payload.append("userid", this.props.afterAuth.userid);
                        console.log(payload);
                        console.log(event.target.files[0]);
                        API.uploadFile(payload)
                            .then((data) => {
                                console.log(data);
                                if (data.status === '201') {
                                    this.getFiles();
                                }
                                else{
                                    
                                }
                            }
                        );
                    }} />

                </div>
                <div className="row">
                <Button style={{color:'#0070e0',backgroundColor:'white',marginLeft:'-20px'}} onClick={()=>{
                    this.props.createFolder();
                }}>
                    <FolderIcon style={{marginRight:'10px'}}/> New Folder
                </Button>
                </div>
            </div>
        )
    }
}
const cfu={
    border: '1px',
    display: 'inlineBlock',
    paddingTop: '6px',
    paddingRight: '12px',
    paddingBottom: '6px', 
    paddingLeft: '12px',
    cursor: 'pointer',
    backgroundColor: '#0070e0',
    margin:"10px",
    width:'100%',
    height:'100%',
    fontColor:'white',
    textAlign:'center',
    color:'white',
    marginLeft:'-20px'
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
        addFileList: (filelist) =>dispatch(addFileList(filelist)),
        createFolder: () =>dispatch(createFolder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (FileSidebar);