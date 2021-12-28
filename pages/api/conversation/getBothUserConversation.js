import Conversation from "../../../models/conversation"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { firstUserId, secondUserId } = req.query;
        if (firstUserId && secondUserId) {
            console.log(req.query)
            try {
                const conversation = await Conversation.findOne({
                    members: { $all: [firstUserId, secondUserId] },
                });
                res.status(200).json(conversation)
            } catch (err) {
                res.status(500).json(err)
                res.end()
            }
        }
    }

    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);