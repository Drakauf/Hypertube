const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const database = process.env.C_MONGO;
const Com = require('../model/Com');
const Viewed = require('../model/ViewedMovie');

mongoose.connect(database);

router.get('/', (req, res) => {
	res.send('server film listening');
});

/**************************************************************/
router.post('/create', (req, res) => {
    let id_film = req.body.id_film;
    let id_user = req.body.id_user;
    let comm = req.body.com;
    let date = new Date(Date.now());

    let com = new Com({
        id_film: id_film,
        id_user: id_user,
        com: comm,
        date: date
    });
    com.save(error => {
        if (error)
        {
            res.status(400).send("Format error, please re-read your input = "+ error);
        }
        else
        {
            res.status(201).json({message: 'Com created successfully'});
        }
    });
  });



  router.get('/getComs/:id', (req, res) => {
    let id_film = req.params.id;
    Com.find({id_film: id_film}, function(err, com){
        if(err){
            console.log("Something wrong when geting com!");
            res.status(400).send("Something wrong when geting com!");
        }
        else
        {
          //console.log("ok com getted  = ", com);
          res.status(201).json({com});
        }
    });
});

    router.get('/getViewed', (req, res) => {
        let id_film = req.query.id_movie;
        let id_user = req.query.id_user;

        Viewed.findOne({Movie_ID: id_film, User_ID: id_user}, function(err, viewed){
            if(err){
                console.log("Something wrong when geting viewed movie!");
                res.status(400).json({'message': err});
            }
            else
            {
              res.status(201).json({viewed});
            }
        });
    });
  


module.exports = router;
