const express = require('express');
const fs = require('fs');

const router = express.Router();
const filePath = './data/userPresencesData.json';

const getPresencesByUsername = async (req, res) => {
    const { username } = req.params;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        let userPresences;
        if (username === 'admin')
            userPresences = users
        else
            userPresences = users.find(u => u.username === username)?.presences;

        if (userPresences) {
            return res.status(200).send(userPresences);
        } else {
            return res.status(401).send('Presences not found');
        }
    });
}

const deletePresencesByUsername = async (req, res) => {
    const { username } = req.params;
    const { date } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
        const users = JSON.parse(data);
        userPresences = users.map(u => u.username === username ? { ...u, presences: u.presences.filter(p => p.date !== date) } : u);

        if (userPresences) {
            return res.status(200).send(userPresences);
        } else {
            return res.status(401).send('Presences not delete');
        }
    });
}

const setPresencesByUsername = async (req, res) => {
    const { username } = req.params;
    const { date, start, end } = req.body

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        let userPresences = [], dateExist, updatedDates;

        dateExist = await users.find(u => u.username === username)?.presences.filter(p => p.date === date);
        updatedDates = await users.find(u => u.username === username)?.presences.map(d => d.date === date ? { ...d, start, end } : d);
        userPresences = await users.map(u => u.username === username ? { ...u, presences: dateExist?.length ? updatedDates : [...u.presences, { date, start, end }] } : u)

        if (userPresences) {
            fs.writeFile(filePath, JSON.stringify(userPresences), 'utf8', err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing user presences');
                }
            });
            const userData = userPresences.find(u => u.username === username)
            return res.status(200).send(userData);
        } else {
            return res.status(401).send('Presences Update faild');
        }
    });
}

const setPresencesListByUsername = async (req, res) => {
    const { username } = req.params;
    const { presences } = req.body

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);
        let dataUpdated = [];

        dataUpdated = await users.map(u => u.username === username ? { ...u, presences } : u)

        if (dataUpdated) {
            fs.writeFile(filePath, JSON.stringify(dataUpdated), 'utf8', err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing user presences');
                }
            });
            const userData = dataUpdated.find(u => u.username === username)
            return res.status(200).send(userData);
        } else {
            return res.status(401).send('Presences Update faild');
        }
    });
}

router.get('/:username', getPresencesByUsername);
router.post('/:username', setPresencesByUsername);
router.post('/:username/all', setPresencesListByUsername);
router.delete('/:username', deletePresencesByUsername);

module.exports = router;