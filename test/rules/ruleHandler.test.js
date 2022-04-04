const { postMessage } = require("../../api/discord");
const {checkRequest} = require("../../rules/ruleHandler");

describe('Rule Handler Test', () => {

    beforeEach(() =>{
        jest.resetModules();
    })

    it('Post is not called when event does not match rule set & Discrod URL is not set', async () => {
        const func = jest.fn();
        await checkRequest("quatsch", "opened", func);
        expect(func).not.toHaveBeenCalled();
     });

     it('Post is not called when event does not match rule set & Discord URL is set', async () => {
        const func = jest.fn();
        process.env.DISCORD_URL = "test"

        await checkRequest("quatsch", "opened", func);
        expect(func).not.toHaveBeenCalled();
     });

     it('Post is called when event matches rule set & Discord URL is set', async () => {
        const body = {
            action: "opened",
            sender: {
                login: "me"
            }
        }

        process.env.DISCORD_URL = "test"

        const func = jest.fn();
        await checkRequest("pull_request", body, func);
        expect(func).toHaveBeenCalled();
     });

     it('Post is not called when event matches rule set & Discord URL is not set', async () => {
        const body = {
            action: "opened",
            sender: {
                login: "me"
            }
        }

        const func = jest.fn();
        await checkRequest("pull_request", body, func);
        expect(func).toHaveBeenCalled();
     });

  });


