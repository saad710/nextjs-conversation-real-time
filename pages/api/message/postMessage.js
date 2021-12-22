import Message from "../../../models/messages"
import connectDB from "../../../middleware/mongodb"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const newMessage = new Message(req.body);

        if (newMessage) {
            try {
                const savedMessage = await newMessage.save();
                res.status(200).json(savedMessage);

            } catch (err) {
                res.status(500).json(err)
            }
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);
