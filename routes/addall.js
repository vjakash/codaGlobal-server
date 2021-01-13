var express = require('express');
var router = express.Router();

//dotenv import
const dotenv = require('dotenv');
dotenv.config();

//mongodb imports
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
let dbURL = process.env.dbURL;

//bcrypt for hashing and comparing password
let bcrypt = require('bcrypt');

//jwt import
const jwt = require('jsonwebtoken');

let authenticate = require('../middlewares/authentication')



// addall route.
router.post('/', async(req, res) => {
    // let { teams } = req.body;
    // if (teams === undefined) {
    //     res.status(400).json({
    //         error: 'Fields missing'
    //     });
    // } else {
    //     let client = await mongodb.connect(dbURL, { useUnifiedTopology: true }).catch(err => { throw err; });
    //     let db = client.db('codaglobal');
    //     await db.collection('teams').insertMany(teams).catch(err => { throw err; });

    //     res.status(200).json({
    //         message: 'All teams added'
    //     });
    // }
});

module.exports = router;