export const configs = {
    DEV: {
      baseURL: 'http://localhost:3000',
      //user: 'devUser',
      //waitTime: 3000, // in milliseconds
      //numOfThreads: 1,
      //defaultElementWaitTime: 5000, // in milliseconds
    },
    STAGING: {
      baseURL: 'https://www.myapp-stg.com',
      //user: 'stagingUser',
      //waitTime: 5000, // in milliseconds
      //numOfThreads: 2,
      defaultElementWaitTime: 7000, // in milliseconds
    },
    PROD: {
      baseURL: 'https://www.myapp.com',
      //user: 'prodUser',
      //waitTime: 8000, // in milliseconds
      //numOfThreads: 4,
      //defaultElementWaitTime: 10000, // in milliseconds
    },
  };