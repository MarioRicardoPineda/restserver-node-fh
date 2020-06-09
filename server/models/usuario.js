const { Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email, es requerido']
  },
  password: {
    type: String,
    required: [true, 'La controseña, Es requerida']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

// usuarioSchema.methods.toJSON = () => {
//   let user = this
//   let userObject = user.toObject

//   delete userObject.password

//   return userObject
// }

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = model('Usuario', usuarioSchema)
