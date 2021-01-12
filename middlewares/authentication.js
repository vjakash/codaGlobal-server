const jwt = require('jsonwebtoken');
// var atob = require('atob');
//mongodb imports
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
let dbURL = process.env.dbURL;

// dotenv import
const dotenv = require('dotenv');
dotenv.config();
// const decode = require('./decode');

async function authenticate(req, res, next) {
    if (req.headers.authorization === undefined) {
        console.log('Not authorized please login again');
        res.status(401).json({ message: 'Not authorized please login again', signout: true });
    } else {
        let token = req.headers.authorization;
        jwt.verify(token, 'qwertyuiopasdfghjkl', (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: 'session expired please login again', signout: true });
            } else {
                // console.log(decoded);
                next();
            }
        })
    }
};
module.exports = authenticate;