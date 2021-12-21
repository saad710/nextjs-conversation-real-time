import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import connectDB from "../../../middleware/mongoDB";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        console.log(req.headers)
        // console.log(VerifyToken(req))
        // const { VerifyToken } = req.headers;
        // console.log(VerifyToken)
        console.log({req:req.headers})
        const token = req.headers['x-aceess-token'];
        console.log({token})
        if (!token)
          return res.status(403).send({ auth: false, message: 'No token provided.' });
          
        jsonwebtoken.verify(token, process.env.secret, function(err, decoded) {
          if (err)
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
          // if everything good, save to request for use in other routes
          console.log({decodedId:decoded.id})
          req.userId = decoded.id;
      
        });
    
        try {
            User.findById(req.userId, { password: 0 }, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                
                res.status(200).send(user);
              });
              
           
          } catch (err) {
            res.status(500).json(err)
          }
      
    } else {
      res.status(422).send('req_method_not_supported');
    }
  };

  
  export default connectDB(handler);
