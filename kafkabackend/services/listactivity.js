var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg,callback) {
	var userid = msg.userid;
	console.log(userid);

	mongo.connect(mongoURL,function(){

		var coll = mongo.collection('activity');
		var mysort = { datetime: -1};
		coll.find({userid:userid}).limit(8).sort(mysort).toArray(function(err,acts){
			if (err) throw err;
			console.log(acts);

			var arr = acts.map(function(obj){
				var temp =  {
					task: obj.task,
					name: obj.name,
					datetime: obj.datetime
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


exports.handle_request = handle_request;