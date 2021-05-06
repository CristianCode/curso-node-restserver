
const { Router } = require( 'express' );  //Llamando a la función
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, haveToRole } = require('../middlewares/validate-roles');
const { validateFields, validateJWT, haveToRole } = require('../middlewares');

const { isValidRole, emailExist, userExistById } = require('../helpers/db-validators');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');


const router = new Router();

    router.get('/', userGet );

    router.put('/:id', [
        check( 'id', 'No es un id válido' ).isMongoId(),
        check( 'id' ).custom( userExistById ),
        check( 'role' ).custom( isValidRole ),
        validateFields
    ] ,userPut );

    router.post('/',[
        check( 'name', 'El nombre es obligatorio' ).notEmpty(),
        check( 'password', 'El password debe ser más de seis letras' ).isLength({ min:6 }),
        check( 'email', 'El correo no es válido' ).isEmail(),
        check( 'email' ).custom( emailExist ),
        // check( 'role', 'No es un rol válido' ).isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check( 'role' ).custom( isValidRole ),
        validateFields  //Reviso las validaciones de mi request- Si hay errores, para mi aplicación y lanza un mensaje. Caso contrario, le doy pase a mi controlador
    ], userPost );

    router.delete('/:id', [
        validateJWT,
        // isAdminRole,
        haveToRole( 'ADMIN_ROLE', 'SALES_ROLE' ),
        check( 'id', 'No es un id válido' ).isMongoId(),
        check( 'id' ).custom( userExistById ),
        validateFields
    ] ,userDelete );

    router.patch('/', userPatch );


module.exports = router;

