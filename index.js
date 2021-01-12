let express = require('express');
let cors = require('cors');
let bcrypt = require('bcrypt');
let bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
let dbURL = process.env.dbURL;


const jwt = require('jsonwebtoken');

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

//appinitialize
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening in port-${port}`)
});

//middleware
app.use(cors());
app.use(bodyParser.json());
//routes imports
let addall = require('./routes/addall.js');


//routes
app.use('/addall', addall);