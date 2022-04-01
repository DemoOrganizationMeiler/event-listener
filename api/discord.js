import { axios } from "axios";

axios.defaults.baseURL = process.env.DISCORD_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function postMessage(message) {
    axios.post("/", {
        content: message
    });
}