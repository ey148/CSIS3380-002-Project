const router = require('express').Router();
let User = require('../models/userList.model');

router.route('/').get((req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const tel = req.body.tel;
    const gender = req.body.gender;

    const newUser = await new User({
        userId,
        username,
        password,
        fname,
        lname,
        email,
        tel,
        gender
    });

    console.log(newUser);
    
    newUser
        .save()
        .then(() => {
            res.json(newUser)
            console.log('newUser added')
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

// find user by userId
router.route('/:username').get(async (req, res) => {

    const username = req.params.username;
    console.log(username);

    await User.findOne({ username: username })
        .then((user) => {
            res.json(user);
            console.log('show selected user: ' + username);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
            console.log("no such username found");
        })
});

module.exports = router;