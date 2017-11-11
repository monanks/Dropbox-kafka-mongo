var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name) {
        console.log('I am listening to '+topic_name);

        this.client = new kafka.Client("localhost:2181");
        //this.client = new kafka.Client("10.0.0.184:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: topic_name, partition: 0 }]);
        this.client.on('ready', function () { console.log('client ready!'+topic_name) })

        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            // this.kafkaProducerConnection.createTopics(['signin_topic','signup_topic','upload_topic','list_topic','download_topic','delete_topic','new_folder_topic','getparent_topic','setstar_topic','listactivity_topic'], false, function (err, data) {
            //     console.log(data);
            // });
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;