var express = require('express');
var router = express.Router();

//obtenemos el modelo UserModel con toda la funcionalidad
var PartidoModel = require('../models/partidos');

/* GET partidos listing. */
router.get('/', function(req, res, next) {
    PartidoModel.getPartidos(function(error, data)
    {
        res.json(200,data);
    });
});

/* GET partidos listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    PartidoModel.getPartido(id,function(error, data)
    {
        res.json(200,data);
    });
});

module.exports = router;
