const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */

router.get('/userFavorite', (req, res) => {
    console.log('/userFavorite GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "favorites";`;
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
 * POST route
 */
router.post('/userFavorite', (req, res) => {
    const businesses = req.body;
    if (req.isAuthenticated()) {
        console.log('userFavorite POST route');
        console.log(req.body);
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = `INSERT INTO favorites ("user_id", "biz_id") VALUES ($1, $2)`;
        let params = [req.body.user_id, req.body.biz_id];
        pool.query(queryText, params).
            then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.delete('/userFavorite', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('shelf Delete route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'DELETE FROM favorites WHERE id=$1'
        const id = req.params.id;
        pool.query(queryText, [id]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});



module.exports = router;