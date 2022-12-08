const Events = require('../models/events');
const event = new Events();

exports.getChange = (req, res) => {
    var val = event.getChange();
    res.send(val);
}