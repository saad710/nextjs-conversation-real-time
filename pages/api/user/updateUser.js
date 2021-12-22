import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        if (req.body.userId === req.query.id || req.body.isAdmin) {
            console.log(req.body)
            console.log(req.query)
            if (req.body.password) {
              try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
              } catch (err) {
                return res.status(500).json(err);
              }
            }
            try {
              const user = await User.findByIdAndUpdate(req.query.id, {
                $set: req.body,
              });
              res.status(200).json("Account has been updated");
            } catch (err) {
              return res.status(500).json(err);
            }
          } else {
            return res.status(403).json("You can update only your account!");
          }
    } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);