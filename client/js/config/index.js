var env = process.env.APP_ENV || 'development';

var config = {
  development: require('./development'),
  production: require('./production')
}[env];

export default config;
