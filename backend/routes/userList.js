const router = require('express').Router();
let User = require('../models/userList.model');

router.route('/').get((req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err));
});

//seed Data to add
// router.route('/add').post(async (req, res) => {

//     // create a new User object
//     const user1 = await new User({
//         userId: 1,
//         username: "user1",
//         password: "user1",
//         fname: "Karli",
//         lname: "Li",
//         email: "karli.li@email.com",
//         tel: "604-123-4567",
//         gender: "F"
//     });

//     const user2 = await new User({
//         userId: 2,
//         username: "user2",
//         password: "user2",
//         fname: "Cherry",
//         lname: "Tse",
//         email: "cherry.tse@email.com",
//         tel: "604-123-5678",
//         gender: "F"
//     });

//     const user3 = await new User({
//         userId: 3,
//         username: "user3",
//         password: "user3",
//         fname: "Eric",
//         lname: "Yam",
//         email: "eric.yam@email.com",
//         tel: "604-123-6789",
//         gender: "M"
//     });

//     const user4 = await new User({
//         userId: 4,
//         username: "user4",
//         password: "user4",
//         fname: "Angus",
//         lname: "Tse",
//         email: "angus.tse@email.com",
//         tel: "604-123-7890",
//         gender: "M"
//     });

//     await User
//             .insertMany([user1, user2, user3, user4])
//             .then(() => {
//                 res.json('new users added!');
//                 console.log('New users added');
//             })
//             .catch((err) => res.status(400).json('Error: ' + err));
// });

// find user by userId
router.route('/:username').get(async (req, res) => {

    const username = req.params.username;
    console.log(username);

    await User.findOne({ username: username })
        .then((user) => {
            res.json(user);
            console.log('show selected user: ' + username);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;