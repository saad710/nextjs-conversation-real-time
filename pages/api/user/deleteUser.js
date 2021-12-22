import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        if (req.body.userId === req.query.id || req.body.isAdmin) {
            try {
              await User.findByIdAndDelete(req.query.id);
              res.status(200).json("Account has been deleted");
            } catch (err) {
              return res.status(500).json(err);
            }
          } else {
            return res.status(403).json("You can delete only your account!");
          }
    } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);