const { changeAOP } = require('../services/teamspeakService');
const { checkPermission } = require('./permissionController');
const config = require('../config/config.json');

module.exports.setupCommands = (Ts3) => {
    RegisterCommand(config.command_name, async (source, args) => {
        const newaop = args.join(" ");
        const commandRunner = GetPlayerName(source);

        if (!newaop) {
            emitNet("chatMessage", source, `^3[AOP] ^7The current area of patrol is: ^1${curraop}`);
            return;
        }

        const hasPermission = config.permissions.toggle ? await checkPermission(source) : true;

        if (hasPermission) {
            emitNet("chat:addMessage", -1, { 
                template: `<div style='background-color: rgba(64, 64, 64, 0.8); text-align: center; border-radius: 0.5vh; padding: 0.7vh; font-size: 1.7vh;'><b>The AOP has been changed to ^3${newaop} ^7by ^1${commandRunner}.</b></div>` 
            });
            curraop = newaop;
            changeAOP(newaop, commandRunner, Ts3);
        } else {
            emitNet("chatMessage", source, `^3[AOP] ^7You do not have permission to change the AOP!`);
        }
    });
};