const mongoose = require('mongoose');
const properties = require('../properties.js');
const logger = require('../logger.js');
exports.connection;

connectDB = function()  {
	const dbConnection_mrperfect99_db = mongoose.createConnection('mongodb://' + properties.mrperfect99_db_dbUrl, function(err){
		if(err) {
			logger.error(err);
			setTimeout(function() {
				console.log("Retry DB connection");
				connectDB();
			}, 3000);
		}
		else
		{
		    exports.connection = dbConnection_mrperfect99_db;
			logger.info("MongoDB connected at: " + properties.mrperfect99_db_dbUrl);
			
			//START IMPORT RESOURCE

			require('./mrperfect99_db_schema.js');

			require('../resource/mrperfect99_db/Category.js');
			require('../resource/mrperfect99_db/subcategory.js');
			
			//END IMPORT RESOURCE
		}
	});

}

connectDB();