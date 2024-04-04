const express = require('express');
const fs = require('fs');

const router = express.Router();
const filePath = './data/userPresencesData.json';


const signIn = async (req, res) => {
    const { username, password } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        const ifUserExist = users.find(u => u.password === password && u.username === username);

        if (ifUserExist) {
            return res.status(200).send(ifUserExist);
        } else {
            return res.status(401).send('Invalid username or password');
        }
    });
}


const signUp = async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        const ifUserExist = users.find(u => u.username === username);

        if (ifUserExist) {
            return res.status(400).send('Username already exists');
        } else {
            const newUser = {
                firstName,
                lastName,
                username,
                password,
                presences: []
            }
            const updatedData = [...users, newUser]

            fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8', err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing user credentials');
                }
                res.status(200).send(newUser);
            });
        }
    });
}

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;