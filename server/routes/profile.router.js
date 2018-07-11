const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('/profile GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM registered_users WHERE id = $1;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in /profile GET', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/profile PUT route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = `UPDATE registered_users SET profile_image=${registered_user.profile_image}, gender=${registered_user.gender}, pronouns=${registered_user.pronouns} WHERE id=$1`;

        pool.query(queryText, 
            [registered_user.profile_image, registered_user.gender, registered_user.pronouns])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in /profile PUT', error);
            res.sendStatus(500);
        });
    }
});

module.exports = router;