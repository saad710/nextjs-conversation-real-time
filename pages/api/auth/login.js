import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import connectDB from "../../../middleware/mongoDB";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

      if(email && password){
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(404).json("user not found");
        
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("wrong password")
        
            const token = jsonwebtoken.sign({ id: user._id }, process.env.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({ auth: true, token: token })
          } catch (err) {
            res.status(500).json(err)
          }
      }
    
    } else {
      res.status(422).send('req_method_not_supported');
    }
  };
  
  export default connectDB(handler);