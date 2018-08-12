const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config({ path: 'variables.env' });
require("babel-core/register");
require("babel-polyfill");


mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`Something went terribly wrong! → ${err.message}`);
});

// import models here
require('./models/User');
require('./models/Bit');
require('./models/UserStats');

// fire it up
const app = require('./app');
const port = process.env.PORT || 7777;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('error', onError);

// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });

module.exports = server;