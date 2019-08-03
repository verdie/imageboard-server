const User = require ('./model')
const { Router } = require('express');
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/user', (request, response,next)=>{
    console.log('REQUEST_BODY',request.body)
    User
        .create({
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, 10),
        })
        .then(user => response.send(user))
        .catch(next)
})
module.exports=router