const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('/businesses GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "businesses";`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const businesses = req.body;
    if (req.isAuthenticated()) {
        console.log('businesses POST route');
        console.log(req.body);
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'INSERT INTO businesses (biz_name, contact_name, address, gender, race, language, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)'

        pool.query(queryText, [businesses.biz_name, businesses.contact_name, businesses.address, businesses.gender, businesses.race, businesses.language, businesses.image_url]).then((result) => {
            res.send(201);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('shelf Delete route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'DELETE FROM businesses WHERE id=$1'
        const id = req.params.id;
        pool.query(queryText, [id]).then((result) => {
            res.send(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});



module.exports = router;