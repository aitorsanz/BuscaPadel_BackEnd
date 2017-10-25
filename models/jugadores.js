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
var userModel = {};

//obtenemos todos los jugadores
userModel.getJugadores = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM jugadores ORDER BY id', function(error, rows) {
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

//obtenemos un jugador por su id
userModel.getJugador = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM jugadores WHERE id = ' + connection.escape(id);
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

//añadir un nuevo jugador
userModel.insertJugador = function(jugadorData,callback)
{
    if (connection)
    {
        connection.query('INSERT INTO jugadores SET ?', jugadorData, function(error, result)
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

//actualizar un usuario
userModel.updateJugador = function(jugadorData, callback)
{
//console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE jugadores SET nombre = ' + connection.escape(jugadorData.username) + ',' +
            'email = ' + connection.escape(jugadorData.email) +
            'WHERE id = ' + jugadorData.id;

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

//eliminar un usuario pasando la id a eliminar
userModel.deleteJugador = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM jugadores WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
//si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM jugadores WHERE id = ' + connection.escape(id);
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
module.exports = userModel;