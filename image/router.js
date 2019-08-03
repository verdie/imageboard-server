const Image = require ('./model')
const { Router } = require('express');
const auth = require('../auth/middleware')
const router = new Router()

router.get('/image', (request, response,next)=>{
    Image.findAll()
        .then(images => {
            console.log('images:', images)
            response.send(images)
        })
        .catch(console.error)
})

router.post('/image', auth , (request, response,next)=>{
    console.log('REQUEST_BODY',request.body)
    Image
        .create({
            url: request.body.url,
            title: request.body.title,
        })
        .then(image => response.send(image))
        .catch(next)
})
module.exports=router