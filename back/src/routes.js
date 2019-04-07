const express = require('express');
const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const database = process.env.C_MONGO;
mongoose.connect(database);

const userSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	age: Number
});

const User = mongoose.model('User', userSchema);

router.use(bodyParser.json());


router.get('/', (req, res) => {
	console.log('server hit /');
	res.send('server listening');
});

router.get('/users', (req, res) => {
	console.log("server hit /users");
	User.find({}, (err, users) => {
		if (err)
			res.status(500).send(error);
		if (!users)
			console.log("users vide");
		else
			console.log(users);
		res.status(200).json(users);
	});
});

router.get('/users/:id', (req, res) => {
	console.log('tapping ' + req.params.id); 
	User.findById(req.params.id, (err, users) => {
		if (err) 
			res.status(500).send(error);
		res.status(200).json(users);
	});
});

router.get('/adduser', (req, res) => {
	console.log("server hit /adduser");
	let user = new User({
		nom: "thevak",
		prenom: "sh",
		age: 23
	});
	user.save(error => {
		if (error)
			res.status(500).send(error);
		res.status(201).json({message: 'User created successfully'});
	});
});

router.post('/testusers', function(req, res){
	console.log(req.body);
	if (req.body.username == "shan" && req.body.password == "test")
	{
		res.status(200).json({
			id: 1,
			username: "shan",
			password: "test",
			token: `fake-jwt-token`
		});
	}
	else
		res.status(400).send('Username or password is incorrect');
})

router.get('/testusers', (req, res) => {
	console.log(req.body);
	res.status(200).json({
		id: 1,
		username: "shan",
		password: "test",
		token: `fake-jwt-token`
	});
})

module.exports = router;
