const { connectToTeamspeak } = require('./services/teamspeakService');
const { setupCommands } = require('./controllers/commandController');
const config = require('./config/config.json');

let curraop = "None Set";

(async () => {
    try {
        const Ts3 = await connectToTeamspeak(config.ts3_settings);
        setupCommands(Ts3);

        console.log(`^2[AOP-Ts3] ^7AOP-Ts3 has been started!^0`);
        console.log(`^2[AOP-Ts3] ^7Made by scentral^0`);
    } catch (err) {
        console.error(`^1[AOP-Ts3] ^7Error initializing resources: ${err.message}^0`);
    }
})();

on("onResourceStart", async (resourceName) => {
    if (resourceName === GetCurrentResourceName()) {
        try {
            const Ts3 = await connectToTeamspeak(config.ts3_settings);
            console.log(`^2[AOP-Ts3] Connected to TS3 server!^0`);
        } catch (err) {
            console.error(`^1[AOP-Ts3] ^7Error connecting to TS3 server: ${err.message}^0`);
        }
    }
});