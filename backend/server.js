const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
mongoose.connect('mongodb://localhost:27017/yardsale', {
    useNewUrlParser: true
});
const upload = multer({
    dest: '../frontEnd/public/images/',
    limits: {
        fileSize: 10000000
    }
});


// scheme and model for profiles
const profileSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    state: String,
    city: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Create Profile
app.post('/api/profiles', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
    });
    try {
        await profile.save();
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all profiles
app.get('/api/profiles', async (req, res) => {
    try {
        let profiles = await Profile.find();
        res.send(profiles);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//delete profile
app.delete('/api/profiles/:id', async (req, res) => {
    try {
        await Profile.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//edit profile
app.put('/api/profiles/:id', async (req, res) => {
    try {
        let newInfo = await Profile.findOne({
            _id: req.params.id
        });
        newInfo.name = req.body.name;
        newInfo.phone = req.body.phone;
        newInfo.email = req.body.email;
        newInfo.state = req.body.state;
        newInfo.city = req.body.city;
        await newInfo.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Schema and model for items
const itemSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    },
    name: String,
    path: String,
    price: String,
    condition: String,
    description: String,
})
const Item = mongoose.model('Item', itemSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

app.post('/api/Profiles/:profileID/items', async (req, res) => {
    try {
        let profile = await Profile.findOne({ _id: req.params.profileID });
        if (!Profile) {
            res.send(404);
            return;
        }
        let item = new Item({
            profile: profile,
            name: req.body.name,
            path: req.body.path,
            price: req.body.price,
            condition: req.body.condition,
            description: req.body.description,
        });
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/profiles/:profileID/items', async (req, res) => {
    try {
        let profile = await Profile.findOne({ _id: req.params.profileID });
        if (!profile) {
            res.send(404);
            return;
        }
        let items = await Item.find({ profile: profile });
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/profiles/:profileID/items/:itemID', async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.itemID, profile: req.params.profileID });
        if (!item) {
            res.send(404);
            return;
        }
        await item.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));