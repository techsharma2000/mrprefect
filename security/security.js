const authMapping = require('./securityMapping.js');
const app = require('../app.js');
const logger = require('../logger.js');

app.all('/*', function(req, res, next) {
	
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,user,pass");

	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		defaultAuth(req, res, next);
	}
});

var defaultAuth = function(req, res, next, roles){
	
	if (!roles){
		roles = findRoleMApping(req.method + ' - ' + req.url.toLowerCase());
	}
	
	getUser(req.headers.user, req.headers.pass, function(user){
		if (hasRole(roles, user))
		{
			req.user = user;
			next();
		}
		else
		{
			logger.info(req.headers.user + " not authorized for " + req.path);
			res.status(401).send("Not authorized");
		}
	});
}

function findRoleMApping(url) {
	for(var i in authMapping){
		if(url.toLowerCase().search(i.toLowerCase()) == 0){
			return authMapping[i];
		}
	}
}

var hasRole = function(roles, user) {
	return ( roles == undefined 
		|| (user != undefined && roles.length == 0 )
		|| (user != undefined && roles.indexOf('PUBLIC') != -1)
		|| (user != undefined && user.roles.indexOf('ADMIN') != -1)
		|| (user != undefined && findOne(roles, user.roles) ) );
}

var findOne = function (array1, array2) {
	for (var i in array1) {
		for (var j in array2) {
			if (array1[i] == array2[j])
				return true
		}	
	}
	
	return false;
}

app['get']('/Login', function(req, res){

	getUser(req.headers.user, req.headers.pass, function(user){
		if (user) {
			logger.info(user.user + " Logged");
			user.pass = "***";
			res.send(user);
		}
		else {
			logger.info(req.headers.user + " Not Authorized");
			res.send({message: "Not Authoized"});
		}
	});
	
});

var getUser = function(user, md5pwd, callback){
	
	// CUSTOMIZE THIS FUNCTION
	// Get your data from DB or whatever you want
	callback ({
		user: "Administrator",
		pass: "pwd",
		roles: ["ADMIN"]
	});
	
};