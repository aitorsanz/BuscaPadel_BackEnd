//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
    //creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
    connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'buscapadel'
        }
    );

//creamos un objeto para ir almacenando todo lo que necesitemos
var partidosModel = {};

//obtenemos todos los partidos
partidosModel.getPartidos = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM partidos ORDER BY id', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//obtenemos un partido por su id
partidosModel.getPartido = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM partidosModel WHERE id = ' + connection.escape(id);
        connection.query(sql, function(error, row)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//añadir un nuevo partido
partidosModel.insertPartido = function(partidoData,callback)
{
    if (connection)
    {
        connection.query('INSERT INTO partidosModel SET ?', partidoData, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}

//actualizar un partido
partidosModel.updatePartido = function(partidoData, callback)
{
//console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE partidosModel SET fkIdJugador1 = ' + connection.escape(partidoData.fkIdJugador1) + ',' +
            'fkIdJugador2 = ' + connection.escape(partidoData.fkIdJugador2)  + ',' + 'fkIdJugador3 = ' + connection.escape(partidoData.fkIdJugador3) + ',' +
            'fkIdJugador4 = ' + connection.escape(partidoData.fkIdJugador4)  + ',' + 'lugar = ' + connection.escape(partidoData.lugar) + ',' +
            'hora = ' + connection.escape(partidoData.hora)  + ',' + 'fecha = ' + connection.escape(partidoData.fecha) + ',' +
            'nivel = ' + connection.escape(partidoData.nivel)  +
            'WHERE id = ' + partidoData.id

        connection.query(sql, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}

//eliminar un partido pasando la id a eliminar
partidosModel.deletePartido= function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM partidosModel WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
//si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM partidosModel WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result)
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = partidosModel;