import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            User.find({}, function (err, users) { 
              res.send(users); 
              }); 
          } catch (err) {
            res.status(500).json(err);
            res.end()
          }
        }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);