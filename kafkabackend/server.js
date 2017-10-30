var connection =  new require('./kafka/Connection');
var signin = require('./services/signin');
var signup = require('./services/signup');
var upload = require('./services/upload');
var listfd = require('./services/listfd');
var filedownload = require('./services/filedownload');
var deletefile = require('./services/deletefile');
var createFolder = require('./services/createFolder');
var getParent = require('./services/getParent')

var producer = connection.getProducer();

var topic_name = 'signin_topic';
var consumer = connection.getConsumer(topic_name);


console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received at '+topic_name);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    signin.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name1 = 'signup_topic';
var consumer1 = connection.getConsumer(topic_name1);

console.log('server1 is running');
consumer1.on('message', function (message) {
    console.log('\nmessage received at '+topic_name1);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    signup.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name2 = 'upload_topic';
var consumer2 = connection.getConsumer(topic_name2);

console.log('server2 is running');
consumer2.on('message', function (message) {
    console.log('\nmessage received at '+topic_name2);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    upload.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name3 = 'list_topic';
var consumer3 = connection.getConsumer(topic_name3);

console.log('server3 is running');
consumer3.on('message', function (message) {
    console.log('\nmessage received at '+topic_name3);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    listfd.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name4 = 'download_topic';
var consumer4 = connection.getConsumer(topic_name4);

console.log('server4 is running');
consumer4.on('message', function (message) {
    console.log('\nmessage received at '+topic_name4);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    filedownload.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name5 = 'delete_topic';
var consumer5 = connection.getConsumer(topic_name5);

console.log('server5 is running');
consumer5.on('message', function (message) {
    console.log('\nmessage received at '+topic_name5);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    deletefile.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name6 = 'new_folder_topic';
var consumer6 = connection.getConsumer(topic_name6);

console.log('server6 is running');
consumer6.on('message', function (message) {
    console.log('\nmessage received at '+topic_name6);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    createFolder.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name7 = 'getparent_topic';
var consumer7 = connection.getConsumer(topic_name7);

console.log('server7 is running');
consumer7.on('message', function (message) {
    console.log('\nmessage received at '+topic_name7);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    getParent.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});