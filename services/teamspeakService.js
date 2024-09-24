const { TeamSpeak, QueryProtocol } = require('ts3-nodejs-scentral');
const { sendDiscordLog } = require('./discordService');
const config = require('../config/config.json');
const { formatTime } = require('../utils/timeUtils');

module.exports.connectToTeamspeak = async (ts3Settings) => {
    try {
        return await TeamSpeak.connect({
            host: ts3Settings.host,
            protocol: QueryProtocol.RAW,
            queryport: ts3Settings.queryport,
            serverport: ts3Settings.serverport,
            username: ts3Settings.username,
            password: ts3Settings.password,
            nickname: ts3Settings.nickname,
        });
    } catch (err) {
        throw new Error(`Error connecting to TS3 server: ${err.message}`);
    }
};

module.exports.changeAOP = async (aop, player, Ts3) => {
    try {
        const channel = await Ts3.getChannelById(config.ts3_settings.channel_id);
        const channelName = config.time_settings.toggle ? `[cspacer]AOP: ${aop} [${formatTime()}]` : `[cspacer]AOP: ${aop}`;
        
        await channel.edit({
            channelDescription: `[center][size=15]AOP: ${aop}[/size][/center][center][size=15]Set By: ${player}[/size][/center]`,
            channelName
        });

        if (config.discord_logs.toggle) {
            await sendDiscordLog(aop, player);
        }
    } catch (error) {
        console.error(error);
    }
};