var express = require('express');
var router = express.Router();
//obtenemos el modelo JugadorModel con toda la funcionalidad
var JugadorModel = require('../models/jugadores');

/* GET jugadores listing. */
router.get('/', function(req, res, next) {
    JugadorModel.getJugadores(function(error, data)
    {
        res.json(200,data);
    });
});

module.exports = router;
