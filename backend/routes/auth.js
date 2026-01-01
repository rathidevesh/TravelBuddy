const express = require('express');
const User = require('../models/User') 
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
require('dotenv').config();
//JWT authentication
const JWT_SECRET = process.env.JWT_SECRET;


//Create a User using :POST "/api/auth/createuser". Doesnt require Auth. No login required
// ROUTE 1 :first endpoint
router.post('/createuser',[
    //validation
    body('email','Enter a valid Email').isEmail(),
    body('name','Enter a valid name').isLength({min:3}),
    body('password','Password must be atleast 5 characters').isLength({min:5}),

], async(req, res) => {
    let success = false;
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    //if there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success ,errors:errors.array()});
    }
    try{
        //Check whether the user with the same email exits already
        let user = await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({success,error:"sorry a user with this email already exists."})
        }

        //generation a hash password.
        const salt = await  bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password,salt);


        //create a new user.
        user = await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email
        })

        //generating authentication token for this data.
        const data ={
            user:{
                id:user.id
            }
        }

        const authToken=jwt.sign(data,JWT_SECRET);

        // console.log(authToken);
        success=true;
        res.json({success,authToken})
        
        // res.json(user)
    }
    //catching the errors.
    catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error Occured')
    }
    // .then(user =>res.json(user))
    // .catch(error=>{console.log(error)
    // res.json({error :'please enter a unique value',message:error.message})})
})


//ROUTE 2 : second endpoint
//Authenticate a User using POST "/api/auth/login"
router.post('/login',[
   body('email','Enter a valid Email').isEmail(),
    body('password','password cannot be blank').exists(),
], async(req, res) => {
    let success = false;
    //if there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
   //destructuring
    const {email ,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare ){
            success = false;
            return res.status(400).json({success ,error:"Please try to login with correct credentials"})
        }
        const data ={
            user:{
                 id:user.id
                }
        }
        
       const authToken=jwt.sign(data,JWT_SECRET);
       success = true;
        res.json({success ,authToken,id: user.id})
   } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error Occured')
    }

});


//ROUTE 3: Get Logged in user details  using POST "/api/auth/getuser" . Login required.
router.post('/getuser',fetchuser, async(req, res) => {
    try {
        userId =req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error Occured')
    }
})
module.exports = router

