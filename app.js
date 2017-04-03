
//IMPORT PROPERTY
const properties = require('./properties.js');
//IMPORT LIBRARY
const logger = require('./logger.js');
const express = require('express');
const app =  module.exports = express();
const mongoose = require('mongoose');
const extend = require('extend');
const http = require('http');
const bodyParser = require('body-parser');
//IMPORT SECURITY & RESOURCES
require('./security/security.js');
require('./security/securityMapping.js');
// START IMPORT DB

require('./db/mrperfect99_db_crud.js');
// END IMPORT DB

//DEFINE ERROR HANDLER
const handleError = function(err, res){
	logger.error(err);
	res.status(500);
	res.send(err);
}

//START APPLICATION
const server = http.Server(app);
app.use(bodyParser.json()); 
app.use(express.static(properties.publicPath));

server.listen(properties.port, function(){
  logger.info('listening on *:' + properties.port);
});

