var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');
const datetime = require('date-time');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var fileid = msg.fileid;
	var filepath = msg.filepath;
    console.log(fileid);

    console.log(filepath);

    if(filepath===undefined){
        var res = {
            status: '202'
        }
        console.log(res);
        callback(null,res);
    }
    else{
        fs.readFile(filepath,function(err,data){
            if(err) throw err;
            //console.log(data);
            var res = {
                status: '201',
                data: data
            }
            console.log(res);
            callback(null,res);
        });
    }
    // mongo.connect(mongoURL,function(){
    //     var coll = mongo.collection('files');
    //     coll.findOne({filepath:filepath},function(err,result){
    //         console.log(result);
    //         if(result){
    //             var res = {
    //                 status: '201',
    //                 data: result.content
    //             }
    //             callback(null,res);
    //         }
    //     })
    // });

    
}

exports.handle_request = handle_request;