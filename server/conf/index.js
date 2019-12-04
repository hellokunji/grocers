exports.buildEnvironment = () => {
  const envConfigFile = '.env';
  require('dotenv').config({path: envConfigFile});
};
