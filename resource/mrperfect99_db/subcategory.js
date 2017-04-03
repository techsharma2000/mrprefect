const app = require('../../app.js');
const db_mrperfect99_db = require('../../db/mrperfect99_db_schema.js')

require('./custom/subcategoryCustom.js');

/*
 * SCHEMA DB subcategory
 * 
	{
		subcategory: {
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
	
app.post('/subcategory/', function(req, res){
	obj = new db_mrperfect99_db.subcategory(req.body);
	obj.save(function(err){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});
	
//CRUD - REMOVE

app['delete']('/subcategory/:id', function(req, res){
	db_mrperfect99_db.subcategory.findByIdAndRemove(req.params.id, function (err) {
		  if (err) return handleError(err, res);
		  res.send(err);
	});
});

//CRUD - FIND BY CategoryId
	
app.get('/subcategory/findByCategoryId/:key', function(req, res){

	db_mrperfect99_db.subcategory.find({ 'CategoryId' : req.params.key}).exec(function(err, list){
		if (err) return handleError(err, res);
		res.send(list);
	});
	
});
	
//CRUD - GET ONE
	
app.get('/subcategory/:id', function(req, res){
	db_mrperfect99_db.subcategory.findOne({_id:req.params.id}).exec(function(err, obj){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});
	
//CRUD - GET LIST
	
app.get('/subcategory/', function(req, res){
	db_mrperfect99_db.subcategory.find().exec(function(err, list){
		if (err) return handleError(err, res);
		res.send(list);
	});
});

//CRUD - LINK LIST CategoryId
	
app.post('/subcategory/CategoryId/:key', function(req, res){

	db_mrperfect99_db.subcategory.find({ CategoryId: req.params.key }, function (err, list){
		var listInsert = req.body.list;
		var key = req.params.key;
		db_mrperfect99_db.subcategory.update({ CategoryId : key, '_id': {$nin: listInsert}}, {$pull: { 'CategoryId': key}}, {multi: true}, function (err) {
			if (err) return handleError(err, res);
			db_mrperfect99_db.subcategory.update({'_id': {$in: listInsert}}, {$addToSet: { 'CategoryId': key}}, {multi: true}, function (err) {
				if (err) return handleError(err, res);
				res.send(err);  
			});
		});
	});
	
});

//CRUD - EDIT
	
app.post('/subcategory/:id', function(req, res){
	db_mrperfect99_db.subcategory.findByIdAndUpdate(req.params.id, req.body, {'new': true}, function(err, obj){
		if (err) return handleError(err, res);
		res.send(obj);
	});
});


/*
 * CUSTOM SERVICES
 * 
 *	These services will be overwritten and implemented in  Custom.js
 */

