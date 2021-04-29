
const { response, request } = require( 'express' );

const userGet = (req = request, res = response) => {

    const { q, nombre, apikey, page, limit} = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}


const userPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    })
}

const userPost = (req, res = response) => {

    const { name, age} = req.body;

    res.json({
        msg: 'post API - Controller',
        name,
        age
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
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