const axios = require("axios");


module.exports.postMessage = async (message) => {
    axios({
      method: 'post',
      url: process.env.DISCORD_URL,
      headers: {'Content-Type': 'application/json'},
      data: {
        content: message
      }
    });
}