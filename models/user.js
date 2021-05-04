
const { Schema, model } = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']

    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']

    },
    img: {
        type: String,

    },
    role: {
        type: String,
        emun: ['ADMIN_ROLE', 'USER_ROLE']

    },
    status: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    },

});

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model( 'User', userSchema );

