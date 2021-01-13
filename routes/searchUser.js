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

// searchUser route.
router.get('/:searchTerm', [authenticate], async(req, res) => {
    let searchTerm = req.params.searchTerm;
    let client = await MongoClient.connect(dbURL, { useUnifiedTopology: true }).catch((err) => { throw err; });
    let db = client.db('codaglobal');
    let users = await db.collection('users').find({}).toArray().catch(err => { throw err; });
    let posts = await db.collection('posts').aggregate([{
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "email",
            as: "ownerDetails"
        }
    }, { $sort: { postedOn: -1 } }]).toArray().catch(err => { throw err; });
    posts = posts.filter(item => {
        if (item.postText.includes(searchTerm)) {
            return item;
        }
    })
    users = users.filter(item => {
        let name = item.firstname + " " + item.lastname;
        if (name.includes(searchTerm)) {
            return item;
        }
    })
    let results = users.concat(posts);
    res.status(200).json({
        results
    })
});

module.exports = router;