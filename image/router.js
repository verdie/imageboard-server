const Image = require ('./model')
const { Router } = require('express');
const router = new Router()

router.get('/image', (request, response,next)=>{
    Image.findAll()
        .then(images => {
            console.log('images:', images)
            response.send(images)
        })
        .catch(console.error)
})
module.exports=router