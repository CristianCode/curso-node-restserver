const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){

        this.app        =   express();
        this.port       =   process.env.PORT;
        this.usersPath  =   '/api/users';
        this.authPath   =   '/api/auth';

        //Conectar a base de datos
        this.connectDB();

        //Middlewares - Son funciones que van a añadir otras funcionalidades al webserver
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

    }

    async connectDB(){
        await dbConnection();
    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static( 'public' ) );

    }

    routes() {
         
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usersPath, require('../routes/user') );

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port );
        });

    }



}



module.exports = Server;