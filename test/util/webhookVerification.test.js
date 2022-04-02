const { verifyWebhookRequest } = require("../../util/webhookVerification");

jest.mock("axios");

describe('Webhook Verification Test', () => {

    beforeEach(() =>{
        jest.resetModules();
    })

    it('Verification was successfull when digest matches calculated hash.', async () => {
        const headerParam = "sha256=4ea9ef31c1909837f58cfce4def4c79b46fa2a844fa50154bb9e7a480d368513"
        const payload ={
            message: "test"
        };

        const result = await verifyWebhookRequest(headerParam, payload);
        expect(result).toBeTruthy();  
     });
  
    it('Verification fails when digest does not match the header param', async () => {
        const headerParam = "sha256=5ea9ef31c1909837f58cfce4def4c79b46fa2a8bb9e7a480d368513"
        const payload ={
            message: "test"
        };
        const result = await verifyWebhookRequest(headerParam, payload);
        expect(result).toBeFalsy();

    });
  });