const Events = require('../models/events');
const event = new Events();

exports.getChange = (req, res) => {
    var change = event.getChange();
    res.send(change);
}

exports.getEvent = (req, res) => {
    var situation = event.getEvent();

    res.send(situation);
}

exports.resetBibleEvent = (req, res) => {
    event.bibleEvent = false;
}