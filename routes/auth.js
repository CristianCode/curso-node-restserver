const { Router } = require( 'express' );  //Llamando a la función
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controllers/auth');


const router = new Router();

router.post('/login', [
    check('email', 'El correo es obligatorio y debe ingresar uno válido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
] ,login );


module.exports = router;