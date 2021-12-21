import Conversation from "../../../models/conversation"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        // const {userId} = req.params;
        //    if(userId){
            try {
                const conversation = await Conversation.find({
                    members: { $in: [req.params.userId] },
                })
                console.log(conversation)
                res.status(200).json(conversation);
            } catch (err) {
                res.status(500).json(err)
            }
           }

    // } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);