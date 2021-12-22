import Message from "../../../models/messages"
import connectDB from "../../../middleware/mongodb"


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { conversationId } = req.query;
        if (conversationId) {
            console.log(req.query)
            try {
                const messages = await Message.find({
                    conversationId: conversationId,
                });
                res.status(200).json(messages);
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