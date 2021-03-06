const { response, request } = require( 'express' );
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async( req = request, res = response ) => {

    const { email, password} = req.body;

    try {


        //Verificar si el email existe

        const user = await User.findOne( { email } );

        if( !user ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - email'
            })
        }

        //Verificar si el usuario está activo
        if( !user.status ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - status:false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password , user.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - password:incorrecto'
            })
        }

        //Generar el JWT
        const token = await generateJWT( user.id ); 


        res.json({
            msg: 'Login ok',
            user,
            token
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }


    

}

module.exports = {
    login
}