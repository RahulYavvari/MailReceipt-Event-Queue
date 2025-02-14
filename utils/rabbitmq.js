const amqp = require("amqplib");

const connect = async (railway_rabbitmq_url) => {
    try {
        const connection = await amqp.connect(railway_rabbitmq_url);
        console.log("[LOG] Connected to rabbitmq with amqp");

        return connection;
    } catch(err) {
        console.error("[ERR LOG] Some error occured while connecting to rabbit mq\ncheck the url and network\n", err);
    }
}

const publish_payload = async (connection, message) => {
    try {
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log(`[LOG] Job sent successfully ${message.id}`);
    } catch(err) {
        console.err("[ERR LOG] An error occured when publishing the payload to the queue", err);
    }
}

module.exports = {
    connect,
    publish_payload
};