const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/users')
const bcrypt = require('bcrypt')
const config = require('config')
const yes = require('yes-https')

//Middleware
app.use(cors())
app.use(bodyParser.json())

//Redirecting to https
if(process.env.NODE_ENV=='production') app.use(yes());;

//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

app.use('/', publicPath);
app.get('/', function(_,res){ res.sendFile(indexPath) });

//Constants
const dbConfig = config.get('Customer.dbConfig');
const saltRounds = 10;
const initalUsers = config.get('Presets.users');
const port = config.get('Presets.port')
console.log('Config:'+dbConfig.uri)

// MongoDB Connection
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.uri, {
	useMongoClient: true
}).catch(function(err){
	console.log(err)
});

mongoose.connection.once('open',function(){
	console.log('Connection made');
}).on('error',function(error){
	console.log('Connection error',error);
});

// Adding test users
bcrypt.hash('1234', saltRounds).then(function(hash){
	var user1 = new User({
		username: 'colin',
		password: hash
	});
	console.log(user1)
	user1.save().then(function(){
		if(user1.isNew === false){
			console.log('Sign Up Successful');
		};
	});
})

// User Login
app.post('/login',function(req,response){
	User.findOne({username:req.body.username}).then(function(result){
		if(result){
			bcrypt.compare(req.body.password, result.password).then(function(res){
				if(res) {
					console.log(req.body.username, 'is now Logged In')
					response.send(req.body.username)
				} else {
					response.send(JSON.stringify('User Exists'));
				}
			})
		} else {
			response.send('User not found');
		}
	}).catch(function(error){
		console.log('Error', error);
	});
})

// Server Port
app.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})
