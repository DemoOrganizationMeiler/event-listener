const { postMessage } = require("../../api/discord");
const axios = require("axios");

jest.mock("axios");

describe('postMessage', () => {
    it('Successfully When posting to Discord', async () => {
        const response = {
            status: 201
        }
        axios.mockImplementationOnce(() => Promise.resolve(response));
        await expect(postMessage("any")).resolves.toEqual(response);
    });
  
    it('Throws Error when posting to Discord ', async () => {
        const errorMessage = 'Network Error';

        axios.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)),);
        try{
            await postMessage("any");
        } catch(err) {
            expect(err.message).toBe("Request to Discord failed. Error: Error: Network Error")
        }

    });
  });