import React,{Component} from 'react';
import {addActivityList} from '../actions/action.js';
import {connect} from 'react-redux';
import * as API from '../api/api';
import List, { ListItem } from 'material-ui/List';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import FolderIcon from 'material-ui-icons/Folder';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import Tooltip from 'material-ui/Tooltip';

class DisplayContent extends Component{

    componentWillMount(){
        this.getActivity(this.props.afterAuth);
    }

    getActivity = (payload) => {
        console.log('hello activity list');
        console.log(payload);
        API.getActivity(payload)
            .then((data) => {
                //console.log(data);
                if(data.status==="201"){
                    this.props.addActivityList(data.data);
                    //this.state=data.files;
                }
                else{

                }
            });
    }

    listActivity = () => {
        if(this.props.activity.list!==undefined){
            const var1 = this.props.activity.list;
            console.log(var1);
             return var1.map((item)=>{
                return (
                <div>
                <ListItem disabled={false} style={{marginLeft:'0px',marginRight:'20px'}} id={item.datetime}  onMouseOver={()=>{
                    document.getElementById(item.datetime).style.background = "#ebf4fd";
                }}
                onMouseOut={()=>{
                    document.getElementById(item.datetime).style.background = "white";
                }}>
                    <div className="row" style={lstyle}>
                        <div className="col-md-1">
                        {(item.task==='Uploaded File' || item.task==='Deleted File')
                        ?<FileIcon style={{width:'50%',height:'50%',color:'#6c7a89',marginTop:'-5px'}}/>
                        :<FolderIcon style={{width:'60%',height:'60%',color:'#92ceff',marginTop:'-5px'}}/>
                        }
                        </div>
                        <div className="col-md-4">
                        {item.name}
                        </div>
                        <div className="col-md-5">
                        {item.task}
                        </div>
                        <div className="col-md-2" style={{textAlign:'right'}}>
                        <Tooltip id="tooltip-icon" title={item.datetime} placement="left" style={{}}>
                            <p style={{fontWeight:'2px'}}>
                                {moment(item.datetime,"YYYY-MM-DD HH:mm:ss").fromNow()}
                            </p>
                        </Tooltip>
                        </div>
                    </div>
                </ListItem>
                <Divider inset style={{marginLeft:'20px',marginRight:'50px'}}/>
                </div>
                )
            });
        }
    }

    render(){
        if(this.props.activity.list===undefined){
            return (
                <div className="row" style={{color:'#637282',fontSize:'12px',marginLeft:'0px',marginTop:'20px'}}>
                    No Recent Activity
                </div>
            );
        }else if((this.props.activity.list) && this.props.activity.list.length===0){
            return (
                <div className="row" style={{color:'#637282',fontSize:'12px',marginLeft:'0px',marginTop:'20px'}}>
                    No Recent Activity
                </div>
            );
        }
        else{
            return (
                
                <div>
                    <div className="row" style={{color:'#637282',fontSize:'12px',marginLeft:'0px',marginTop:'20px'}}>
                        Recent Activity
                    </div>
    
                    <div className="row" style={{marginLeft:'0px'}}>
                    <List>
                    <Divider inset style={{marginLeft:'20px',marginRight:'50px'}}/>
                        {this.listActivity()}
                    </List>
                    </div>
                </div>
            );
        } 
    }
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
        activity: state.activity, 
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        addActivityList: (filelist) =>dispatch(addActivityList(filelist))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayContent);