import Conversation from "../../../models/conversation"
import connectDB from "../../../middleware/mongoDB"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { senderId, receiverId } = req.body;

        if (senderId, receiverId) {
            try {
                const newConversation = new Conversation({
                    members: [req.body.senderId, req.body.receiverId],
                });
                const savedConversation = await newConversation.save();
                res.status(200).json(savedConversation);

            } catch (err) {
                res.status(500).json(err)
            }
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
