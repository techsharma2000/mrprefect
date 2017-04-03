const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db_mrperfect99_db_schema = [];
const db_mrperfect99_db = [];

//SCHEMA DB mrperfect99_db

//SCHEMA Category
db_mrperfect99_db_schema.Category = new mongoose.Schema({
	category: {
		type: 'String'
	},
	//RELATIONS
	
	
	//EXTERNAL RELATIONS
	/*
	CategoryId: {
		type: Schema.ObjectId,
		ref : "subcategory"
	},
	*/
});

//SCHEMA subcategory
db_mrperfect99_db_schema.subcategory = new mongoose.Schema({
	subcategory: {
		type: 'String'
	},
	//RELATIONS
	CategoryId: {
		type: Schema.ObjectId,
		ref : "Category"
	},
	
	
	//EXTERNAL RELATIONS
	/*
	*/
});

require('./mrperfect99_db_customSchema.js');
var mrperfect99_db_model = require('./mrperfect99_db_crud.js');


db_mrperfect99_db.Category = mrperfect99_db_model.connection.model('Category', db_mrperfect99_db_schema.Category );
db_mrperfect99_db.subcategory = mrperfect99_db_model.connection.model('subcategory', db_mrperfect99_db_schema.subcategory );

module.exports = db_mrperfect99_db;
