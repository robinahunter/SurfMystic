require('dotenv').config()

const { GOOGLE_API_KEY } = process.env;

const googleConfig = {
  googleApiKey: GOOGLE_API_KEY,
};

export default googleConfig;