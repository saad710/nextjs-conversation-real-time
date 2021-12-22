import User from "../../../models/user"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const {userId,username} = req.query;
           if(userId && username){
            console.log(req.query)
            try {
                // const userId = req.query
                const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });
              const { password, updatedAt, ...other } = user._doc;
              res.status(200).json(other);
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