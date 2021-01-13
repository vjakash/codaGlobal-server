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
let authenticate = require('../middlewares/authentication')

// getPosts route.
router.get('/', [authenticate], async(req, res) => {
    let owner = req.headers.email;
    let client = await MongoClient.connect(dbURL, { useUnifiedTopology: true }).catch((err) => { throw err; });
    let db = client.db('codaglobal');
    let posts = await db.collection('posts').aggregate([{
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "email",
            as: "ownerDetails"
        }
    }, {
        $match: {
            owner: { $ne: owner }
        }
    }, { $sort: { postedOn: -1 } }]).toArray().catch(err => { throw err; });

    res.status(200).json({
        posts
    })
});

module.exports = router;