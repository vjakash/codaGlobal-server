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


//node-mailer
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
let mailOptions = {
    from: process.env.EMAIL,
    to: '',
    subject: 'Sending Email using Node.js',
    html: `<h1>Hi from node</h1><p> Messsage</p>`
};

// register route.
router.post('/', async(req, res) => {
    let { email, password } = req.body;
    if (email === undefined || password === undefined) {
        res.status(400).json({
            error: 'Fields missing'
        });
    } else {
        let client = await MongoClient.connect(dbURL, { useUnifiedTopology: true }).catch((err) => { throw err; });
        let db = client.db('codaglobal');
        let data = await db.collection('users').findOne({ email }).catch((err) => { throw err; });
        if (data) {
            res.status(400).json({
                message: 'Email already registered'
            });
        } else {
            let saltRounds = 10;
            let salt = await bcrypt.genSalt(saltRounds).catch((err) => { throw err; });
            let hash = await bcrypt.hash(password, salt).catch((err) => { throw err; });
            req.body.password = hash;
            await db.collection('users').insertOne(req.body).catch(err => { throw err; });
            client.close();
            res.status(200).json({
                message: "Account Created"
            })
        }

    }
});

module.exports = router;