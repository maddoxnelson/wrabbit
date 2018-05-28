const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });
require("babel-core/register");
require("babel-polyfill");

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`Something went wrong! → ${err.message}`);
});

// import models here
require('./models/Bit');
require('./models/User');
require('./models/UserStats');

// fire it up
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
