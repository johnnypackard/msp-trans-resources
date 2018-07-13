const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all registered users
 */
router.get('/', (req, res) => {
    console.log('/admin GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "businesses";`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in /admin GET', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/user', (req, res) => {
    console.log('admin /user GET', req.query);
    const users = req.query.person;
    console.log('GETting all users', person);
    let queryText = `SELECT * FROM "person";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting users', error);
        res.sendStatus(500);
    });
});

/**
 * POST new business
 */
router.post('/', (req, res) => {
    const business = req.body;
    if (req.isAuthenticated()) {
        console.log('/admin POST route');
        console.log(req.body);
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'INSERT INTO businesses (biz_name, contact_name, address, gender, race, language) VALUES ($1, $2, $3, $4, $5, $6);';
        
        pool.query(queryText, 
            [business.biz_name, business.contact_name, business.address, business.gender, business.race, business.language])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in /admin post', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.delete(':/id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/admin Delete route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'DELETE FROM businesses WHERE id=$1;';
        const id = req.params.id;
        pool.query(queryText, [id]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in /admin DELETE', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// router.delete(':/user', (req, res) => {
//     if (req.isAuthenticated()) {
//         console.log('/admin Delete route');
//         console.log('is authenticated?', req.isAuthenticated());
//         console.log('user', req.user);
//         let queryText = 'DELETE FROM person WHERE id=$1;';
//         const id = req.params.id;
//         pool.query(queryText, [id]).then((result) => {
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('error in /admin DELETE', error);
//             res.sendStatus(500);
//         });
//     } else {
//         res.sendStatus(403);
//     }
// });

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/admin PUT route');
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);
        let queryText = 'UPDATE businesses WHERE id=$1;';

        pool.query(queryText, 
            [business.biz_name, business.contact_name, business.address, business.gender, business.race, business.language, business.image_url])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in /admin PUT', error);
            res.sendStatus(500);
        });
    }
});



module.exports = router;