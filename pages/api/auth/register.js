import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import connectDB from "../../../middleware/mongoDB";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

      if(username && email && password){
        try {
            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            //create new user
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword,
            });
        
            //save user and respond
            const user = await newUser.save();
        
            const token = jsonwebtoken.sign({ id: user._id }, process.env.secret, {
                    expiresIn: 86400 // expires in 24 hours
                 });
            res.status(200).json({ auth: true, token: token });
          } catch (err) {
            res.status(500).json(err)
          }
      }
    } else {
      res.status(422).send('req_method_not_supported');
    }
  };
  
  export default connectDB(handler);

