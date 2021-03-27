const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const {registerValidation,loginValidation} = require("../validation/authValidation");

const verify = require("./verifyToken");

router.post("/register", verify, async (req,res)=> {

    //Validation part
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    const {name,surname,email,password,publicAddress} = req.body;

    //Checking if the user is already in database
    const userDB = await User.findOne({publicAddress})
    if(userDB) return res.status(400).send("Public Address already exists.");

    const salt = await bcrypt.genSalt(10);
    const digest = await bcrypt.hash(password,salt);

    const user = new User({
        name,
        surname,
        email,
        password: digest,
        publicAddress
    });
    try{
        const savedUser = await user.save();
        //WEB3 kullanıp publicAddress akıllı kontratın makePersonel fonksiyonuna yollanacak.
        res.send({user:user._id});
    }catch(error){
        console.log(error);
        res.status.apply(404).send(error);
    }
})




router.post("/login", async (req,res)=> {

    //Validation part
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);

    const {email,password} = req.body;


    const userDB = await User.findOne({email})

    if(!userDB) return res.status(400).send("Email or password is wrong.");

    //PASSWORD COMPARE
    const validPass = bcrypt.compare(password,userDB.password);
    if(!validPass) return res.status(400).send("Invalid password.");

    //Create and assign a token
    const token = jwt.sign({_id:userDB._id,publicAddress:userDB.publicAddress},process.env.TOKEN_SECRET);
    res.header("auth-token",token).send(token);
})

module.exports = router;