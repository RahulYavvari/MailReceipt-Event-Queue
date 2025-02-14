const express = require("express");
const dotenv = require("dotenv");
const ua = require('express-useragent');

const rabbitmq = require("./utils/rabbitmq.js");
const locationAPI = require("./utils/location.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(ua.express());

const port = process.env.PORT;
const railway_rabbitmq_url = process.env.RAILWAY_RABBITMQ_URL;

const connection = rabbitmq.connect(railway_rabbitmq_url);

app.get("/visit", async (req, res) => {
    try {
        const id = req.query.id;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const device_info = req.useragent;
        const referrer = req.get('Referer') || 'No referrer';
        const origin = req.get('Origin') || 'No origin';
        const location = await locationAPI.locate(ip);
        const status = "read";
        const accumulator = 1;
        const time = new Date();

        const message = {
            id, ip, device_info, referrer, origin, location, status, accumulator, time
        };

        console.log(message);

        var options = {
            root: __dirname,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }
        
        if(id) {
            console.log("[VISITED] ", id);
            res.sendFile(`./assets/${process.env.PAYLOAD_NOMENCLATURE}`, options);
        } else {
            res.sendFile(`./assets/${process.env.PAYLOAD_NOMENCLATURE}`, options);
        }
    } catch(err) {
        console.error("[ERR LOG] Something happened while transferring the payload", err);
    }
});


app.listen(port, () => {
    console.log(`[LOG] Connected to port ${port}`);
});