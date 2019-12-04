'use strict';
const express = require('express');
const requireAuth = (req, res, next) => {},
    apiRoutes = require('./api')(requireAuth);
require('../config');

module.exports = app => {
    // serve static contents
    app.use(express.static(__dirname + '../../../public'));
    app.use('/js', express.static(__dirname + 'public/js', { maxAge: 31557600000 }));
    app.use('/css', express.static(__dirname + 'public/css', { maxAge: 31557600000 }));
    app.use('/img', express.static(__dirname + 'public/img', { maxAge: 31557600000 }));

    // Start of Application logic Routes
    app.use('/api', apiRoutes);

    app.get('/*', (req, res) => {
        let data = require('fs').readFileSync('public/index.html').toString();
        //console.log(data);
        res.send(data);
    });

    // Random request _ handle page not found error _ 404
    app.use((req, res) => {
        // respond with html page
        if (req.accepts('html')) {
            res.redirect('/');
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.status(404).send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        res.status(404).type('txt').send('Not found');
    });
};