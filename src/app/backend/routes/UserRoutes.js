const router = require('express').Router()
// const { json } = require('stream/consumers')
// const user_all_module = require('../models/user_all_module')
const User = require('../models/user_all_module')
const routes = require('./routes')

router.get('/', (req, res) => {
    User.find().then(User => {
        res.status(200).json(User)
    }).catch(err => {
        res.status(500), json({ error: err.message })
    })
})

router.post('/register', (req, res) => {
    if(userExists(req.body.email)){
        res.status(409).json({error:'Email Already Exists'})
    }else{
        const newUser = new User(req.body)
        newUser.save().then(user => {
            res.status(201).json(user)
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
   
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password}).then(user=>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(401).json({error:'Incorrect email or password'})
        }
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })
})

const userExists =  (email)=>{
    User.findOne({email:email.toLowerCase().trim()}).then(user=>{
        if(user){
            console.log('found user')
            return true
        }else{
            console.log('did not found user')
            return false
        }
    }).catch(err=>{
        console.log(err)
    })
}


module.exports = router;