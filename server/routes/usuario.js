const router = require('express').Router()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')


router.get('/usuario', (req, res) => {

  let  desde = parseInt(req.query.desde) || 0
  
  Usuario.find({estado: true})
    .skip(desde)
    .limit(5)
    .exec( (err, usuarios) => {
      if( err ){
        return res.status(400).json({
          ok: false,
          error: err
        })
      }

      Usuario.countDocuments({estado: false}, (err, conteo) => {
  
        if( err ){
          return res.status(400).json({
            ok: false,
            error: err
          })
        }

        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        })
  
      })
      
    } )

})

router.post('/usuario', (req, res) => {

  const body = req.body

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10) ,
    role: body.role
  })

  usuario.save( (err, usuarioDB) => {

    if( err ){
      return res.status(400).json({
        ok: false,
        error: err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    })

  } )

})

router.put('/usuario/:id', (req, res) => {
  const id = req.params.id
  const body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] )

  Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, usuarioDB) =>{

    if( err ){
      return res.status(400).json({
        ok: false,
        error: err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    })

  } )
  res.json({id})
})

router.delete('/usuario/:id', (req, res) => {

  const id = req.params.id
  const cambiaEstado = { estado: false }

  Usuario.findByIdAndUpdate( id, cambiaEstado, {new: true}, (err, usuarioState) => {

    if( err ){
      return res.status(400).json({
        ok: false,
        error: err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioState
    })

  } )

  // Usuario.findByIdAndRemove( id, ( err, usuarioDelete ) => {

  //   if( err ){
  //     return res.status(400).json({
  //       ok: false,
  //       error: err
  //     })
  //   }

  //   if( !usuarioDelete){
  //     return res.status(400).json({
  //       ok: false,
  //       error: {
  //         message: 'Usuario no encontrado'
  //       }
  //     })
  //   }

  //   res.json({
  //     ok: true,
  //     usuario: usuarioDelete
  //   })

  // } )

})

module.exports = router;