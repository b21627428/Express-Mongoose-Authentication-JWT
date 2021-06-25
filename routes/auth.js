const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const {registerValidation,loginValidation} = require("../validation/authValidation");


router.post("/register", async (req,res)=> {

    //Validation part
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error);

    const { name, surname, email, password } = req.body;

    //Checking if the user is already in database
    
    try{    

    	const userDB = await User.findOne({email});
	if (userDB) throw Error("Email already exists.");

	const salt = await bcrypt.genSalt(10);
	const digest = await bcrypt.hash(password, salt);

	  const user = new User({
	    name,
	    surname,
	    email,
	    password: digest,
	  });
  	const savedUser = await user.save();
   
        res.status(200).send();
    }catch(error){
        console.log(error);
        res.status(442).send(error);
    }
})




router.post("/login", async (req,res)=> {

    //Validation part
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);

    const {email,password} = req.body;

    try{    
	    const userDB = await User.findOne({email})

	    if(!userDB) return res.status(400).send("Email or password is wrong.");

	    //PASSWORD COMPARE
	    const validPass = bcrypt.compare(password,userDB.password);
	    if(!validPass) return res.status(400).send("Email or password is wrong.");

	    //Create and assign a token
	    const token = jwt.sign({_id:userDB._id,email:userDB.email},process.env.TOKEN_SECRET);
	    res.header("auth-token",token).send(token);
    }catch(error){
        console.log(error);
        res.status(442).send(error);
    }

})

module.exports = router;
