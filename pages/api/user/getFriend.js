import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const {userId} = req.query;
           if(userId){
            console.log(req.query)
            try {
                const user = await User.findById(userId);
                const friends = await Promise.all(
                  user.followings.map((friendId) => {
                    return User.findById(friendId);
                  })
                );
                let friendList = [];
                friends.map((friend) => {
                  const { _id, username, profilePicture } = friend;
                  friendList.push({ _id, username, profilePicture });
                });
                res.status(200).json(friendList)
            } catch (err) {
                res.status(500).json(err)
            }
           }

    } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);