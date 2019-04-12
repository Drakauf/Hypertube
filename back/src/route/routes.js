const express = require('express');
//const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const bodyParser = require('body-parser');
var api = require('../api_req');

const database = process.env.C_MONGO;
mongoose.connect(database);

router.use(bodyParser.json());


router.get('/', (req, res) => {
	res.send('server listening');
});
//router.get('/redirect', router.post('/login'));


/********************************************/
router.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		if (err)
			res.status(500).send(error);
		else
			res.status(200).json(users);
				
	});
});

router.get('/users/:id', (req, res) => {
	User.findById(req.params.id, (err, users) => {
		if (err) 
			res.status(400).send(error);
		else
			res.status(200).json(users);
	});
});
/*************************************************/



router.get('/api', (req, res) => {
	console.log("api_rep hit");
//	res.send("l\'api va s\'afficher la =>");
	api.api_req(req, res);
	})

router.get('/api_by_id', (req, res) => {
	console.log("api_rep hit");
//	res.send("l\'api va s\'afficher la =>");
	api.api_by_id(req, res, 7491);
	})
module.exports = router;
