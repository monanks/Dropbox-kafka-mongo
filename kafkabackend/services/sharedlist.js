var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg,callback) {
	var email = msg.userid;
	var curdir = msg.curdir;

	if(curdir==='0'){
		mongo.connect(mongoURL,function(){

		var coll = mongo.collection('share');
		var mysort = { filetype: -1, datetimeCreated: -1};
		coll.find({emailshare:email}).sort(mysort).toArray(function(err,files){
			if (err) throw err;
			//console.log(files);

			var arr = files.map(function(obj){
				//console.log(getStar(userid,obj._id));
				let a = 1;
				var temp = {
					shareid: obj._id,
					fileid: obj.fileid,
					filename: obj.filename,
					filetype: obj.filetype,
					datetime: obj.datetime,
					path: obj.filepath,
					star: obj.star
				}
				return temp;
				
			});

			let res = {
				status:'201',
				data: arr
			}

			//console.log(res);

			callback(null,res);
		});

	});
	}

	
}


exports.handle_request = handle_request;