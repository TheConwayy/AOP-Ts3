const axios = require('axios').default;
const config = require('../config/config.json');

module.exports.checkPermission = async (player) => {
    const discordID = GetPlayerIdentifier(player, 4).replace("discord:", "");
    
    try {
        const { data } = await axios.get(`https://discord.com/api/guilds/${config.permissions.guild_id}/members/${discordID}`, {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bot ${config.permissions.token}`
            }
        });
        return data.roles.some(role => config.permissions.roles.includes(role));
    } catch (error) {
        console.error(error);
        return false;
    }
};