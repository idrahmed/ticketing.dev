export const natsWrapper = {
  client: {
    // the mock fn allows us to make expectations etc. 
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
