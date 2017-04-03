const app = require('../../app.js');
const db_mrperfect99_db = require('../../db/mrperfect99_db_schema.js')

require('./custom/CategoryCustom.js');

/*
 * SCHEMA DB Category
 * 
	{
		category: {
			type: 'String'
		},
		//RELATIONS
		
		
		//EXTERNAL RELATIONS
		
		CategoryId: {
			type: Schema.ObjectId,
			ref : "subcategory"
		},
		
	}
 * 
 */



//CRUD METHODS


//CRUD - CREATE
	
app.post('/Category/', function(req, res){
	obj = new db_mrperfect99_db.Category(req.body);
	obj.save(function(err){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});
	
//CRUD - REMOVE

app['delete']('/Category/:id', function(req, res){
	db_mrperfect99_db.Category.findByIdAndRemove(req.params.id, function (err) {
		  if (err) return handleError(err, res);
		  res.send(err);
	});
});
	
//CRUD - GET ONE
	
app.get('/Category/:id', function(req, res){
	db_mrperfect99_db.Category.findOne({_id:req.params.id}).exec(function(err, obj){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});
	
//CRUD - GET LIST
	
app.get('/Category/', function(req, res){
	db_mrperfect99_db.Category.find().exec(function(err, list){
		if (err) return handleError(err, res);
		res.send(list);
	});
});

//CRUD - EDIT
	
app.post('/Category/:id', function(req, res){
	db_mrperfect99_db.Category.findByIdAndUpdate(req.params.id, req.body, {'new': true}, function(err, obj){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});


/*
 * CUSTOM SERVICES
 * 
 *	These services will be overwritten and implemented in  Custom.js
 */

