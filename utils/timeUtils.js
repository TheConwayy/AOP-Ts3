const config = require('../config/config.json');

module.exports.formatTime = () => {
    return new Date().toLocaleString('en-US', {
        hour12: true,
        timeZone: config.time_settings.time_zone,
        hour: "2-digit",
        minute: "2-digit",
    });
};