var mongoDbUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/Scorez";
var appPort = Number(process.env.PORT || 3000);
var config = {
  local: {
    appPort: appPort,
    mode: 'local',
    mongoDbUri: mongoDbUri
  },
  prod: {
    appPort: appPort,
    mode: 'prod',
    mongoDbUri: mongoDbUri
  }
};

module.exports = function(mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
};