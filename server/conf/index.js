exports.buildEnvironment = () => {
  const envConfigFile = '.env.example';
  require('dotenv').load({path: envConfigFile});
};
