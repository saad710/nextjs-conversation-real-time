import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        if (req.body.userId !== req.query.id) {
            try {
              const user = await User.findById(req.query.id);
              const currentUser = await User.findById(req.body.userId);
              if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.query.id } });
                res.status(200).json("user has been unfollowed");
              } else {
                res.status(403).json("you dont follow this user");
              }
            } catch (err) {
              res.status(500).json(err);
            }
          } else {
            res.status(403).json("you cant unfollow yourself");
          }
    } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);