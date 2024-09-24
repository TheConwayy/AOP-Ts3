const axios = require('axios').default;
const config = require('../config/config.json');

module.exports.sendDiscordLog = async (aop, player) => {
    const embed = {
        title: "AOP Changed",
        description: `The AOP has been changed to **${aop}** by **${player}**.`,
        color: 16711680,
        footer: { text: `AOP-Ts3 By scentral` }
    };

    try {
        await axios.post(config.discord_logs.webhook, { embeds: [embed] }, {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`^1[AOP-Ts3] ^7Invalid Discord Webhook URL in config.json.^0`);
        } else {
            console.error(error);
        }
    }
};