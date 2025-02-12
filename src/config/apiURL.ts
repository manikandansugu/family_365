// server functions
const getServer = () => {
  return SERVER_KEY.DEV;
};

const getBaseURL = () => {
  if (getServer() === SERVER_KEY.DEV) {
    return END_POINT.dev;
  } else if (getServer() === SERVER_KEY.STAGE) {
    return END_POINT.stage;
  } else if (getServer() === SERVER_KEY.PRODUCTION) {
    return END_POINT.production;
  }
};

// server values
const SERVER_KEY = {
  DEV: 'DEV',
  STAGE: 'STAGE',
  PRODUCTION: 'PRODUCTION',
};

const END_POINT = {
  dev: 'https://dev.family365.org:8443/api',
  stage: '',
  production: 'https://inspirations.family365.org:8443/api'
};

// export
export { getServer, getBaseURL, SERVER_KEY, END_POINT };
