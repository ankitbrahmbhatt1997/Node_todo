// const { SHA256 } = require('crypto-js');
// const jwt = require('jsonwebtoken');



// let data = {
//     id: 10
// }

// let token = jwt.sign(data, "123abc");

// let decoded = jwt.verify(token, "123abc");


// console.log(token);
const bcrypt = require('bcryptjs');


let password = "123abc";

bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
})