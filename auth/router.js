const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt');
const auth=require('./middleware')

const router = new Router()

router.post('/login', (request, response,next)=>{
        const { body } = request;
        const { email } = body;
        const { password } = body;
        // if(email === user.email && password === user.password) { 
        //     jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
        //         if(err) { console.log(err) }    
        //         response.send(token);
        //     });
        // } else {
        //     response.status(400).send({
        //         message: 'Please supply a valid email and password'
        //       })
        // }
        if(!email && !password){
            response.status(400).send({
                message: 'Please supply a valid email and password'
            })
        }
        console.log('EMAIL:',request.body.email )
        User
            .findOne({
                where: {
                email: request.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    response.status(400).send({
                        message: 'User with that email does not exist'
                })
                }

    // 2. use bcrypt.compareSync to check the password against the stored hash
        if (bcrypt.compareSync(request.body.password, entity.password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        response.send({
            jwt: toJWT({ userId: entity.id })
        })
        }
        else {
        response.status(400).send({
                message: 'Password was incorrect'
        })
        }
    })
  .catch(err => {
    console.error(err)
    response.status(500).send({
        message: 'Something went wrong'
    })
  })
})

router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
})

module.exports = router