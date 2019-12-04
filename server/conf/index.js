exports.buildEnvironment = () => {
    const envConfigFile = require('fs').existsSync('.env') ? '.env' : '.env.example';
    require('dotenv').load({ path: envConfigFile });
};