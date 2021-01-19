const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
app.use(bodyParser.json());

app.options('*', cors())
app.use(cors())

const url = process.env.MONGODBURL;

mongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, db) {
    if (err) throw err;
    console.log("Database Connected!");
    db.close();
});

app.get("/", (req, res) => {
    res.send('Namaste From Server..')
});

app.post("/response",async (req, res) => {
    const {
        name,
        email,
        apps,
        profession,
        memeScale,
        ageGroup,
        prosAndCons,
        // suggestions
    } = req.body;
    // const suggestions_ = suggestions.split('-');
    const prosAndCons_ = prosAndCons.split('-');
    let client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); //connect to db
    let db = client.db("form"); //db name
    let response = db.collection("responses"); //collection name
    response.insertOne({
        name:name,
        email:email,
        apps:apps,
        memeScale:memeScale,
        profession:profession,
        ageGroup:ageGroup,
        prosAndCons:prosAndCons_.slice(1,prosAndCons_.length),
        // suggestions:suggestions_.slice(1,suggestions_.length)
    });
    return res.sendStatus(201);
})

app.listen(3000, () => {
    console.log("Server is Live...");
})