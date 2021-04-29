
const { Router } = require( 'express' );  //Llamando a la función
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');


const router = new Router();

    router.get('/', userGet );

    router.put('/:id', userPut );

    router.post('/', userPost );

    router.delete('/', userDelete );

    router.patch('/', userPatch );


module.exports = router;

