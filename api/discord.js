const {axios} = require("axios");

axios.defaults.baseURL = process.env.DISCORD_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports.postMessage = async (message) => {
    axios.post("/", {
        content: message
    });
}