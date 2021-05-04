const { response, request } = require( 'express' );
const bcrypjs = require('bcryptjs');

const User = require('../models/user'); //Es un estandar que se ponga la primera letra en mayuscula

const userGet = async(req = request, res = response) => {

    // const { q, nombre, apikey, page, limit} = req.query;
    const { limit = 5 , since = 0 } = req.query;
    const query = { status :true };
    //Se debe hacer una validación para que los parametos limit y since solo reciban valores de tipo número
      
    
    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
        .skip( Number( since ) )
        .limit( Number(limit) )
    ])

    res.json({
        total,
        users
    })
}


const userPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...userData } = req.body;

    //TODO validar contra base de datos
    if( password ){
        //Significa que el usuario desea actualizar su contraseña
        //encriptar la contraseña
        const salt = bcrypjs.genSaltSync();
        userData.password = bcrypjs.hashSync( password, salt );
    } 

    //Actualizo la data
    const user = await User.findByIdAndUpdate( id, userData);

    res.json({
        user
    })
}

const userPost = async(req = request, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User( { name, email, password, role } );

    //encriptar la contraseña
    const salt = bcrypjs.genSaltSync();
    user.password = bcrypjs.hashSync( password, salt );

    //guardar en base de datos
    await user.save();

    res.json({
        user
    })
}

const userDelete = async(req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { status : false } );

    res.json({
        user
    })
}

const userPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    })
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}