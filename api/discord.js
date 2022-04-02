const axios = require("axios");

// Use simple POST request to trigger Discord bot.
module.exports.postMessage = async (message) => {
    try{
        await axios({
            method: 'post',
            url: process.env.DISCORD_URL,
            headers: {'Content-Type': 'application/json'},
            data: {
              content: message
            }
          });
    } catch(err){
        console.error(err);
        throw new Error("Request to Discord failed. Error: " + err);
    }
}