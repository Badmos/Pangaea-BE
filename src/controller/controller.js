const axios = require('axios');
const eventStream = require('events');

const { BASE_URL } = require('../../config/config');

const events = [];
const emitter = new eventStream.EventEmitter();

module.exports.publisherController = async (req, res) => {
    const { topic } = req.params;
    const data = req.body;

    await axios({
        url: `${BASE_URL}/event`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
            topic, data
        }
    })

    res.status(200).json({
        status: 'success',
        message: 'Event successfully Published',
        data: {
            topic, data
        }
    })
};

module.exports.eventController = (req, res) => {
    const data = req.body;
    const topic = data.topic;
    
    events.push(data);

    if(!data && !data.topic) {
        throw new Error('You must first create a subscription/topic before publishing an event')
    }

    emitter.on(topic, (data) => {
        console.log(data, `${topic} event received`);
    })

    console.log(events, 'All Events');

    res.status(200).json(data);
};

module.exports.subscriberController = (req, res) => {
    const { topic } = req.params;
    const data = req.body;

    emitter.emit(topic, {
        topic, data
    });

    const filteredEvents = events.filter(event => event.topic === topic)

    if(filteredEvents.length === 0) {
        return res.status(200).json({
            status: 'success',
            message: `${topic} Subscription created. Topic ${topic} listening for incoming events`,
            data: null
        });
    }

    return res.status(200).json({
        status: 'success',
        message: `Subscription Events successfully fetched for ${topic}`,
        data: filteredEvents
    });
};

module.exports.indexController = (req, res) => {
    if(events.length === 0) {
        return res.status(404).json({
            status: 'NotFoundError',
            message: 'Events must be published before it can be fetched',
            data: null
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'Events successfully fetched',
        data: events
    })
};