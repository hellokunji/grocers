exports.buildEnvironment = () => {
  const envConfigFile = '.env';
  require('dotenv').load({path: envConfigFile});
};
