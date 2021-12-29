import Conversation from "../../../models/conversation"
import connectDB from "../../../middleware/mongodb"
import { resolveHref } from "next/dist/shared/lib/router/router";


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const {userId} = req.query;
           if(userId){
            console.log(req.query)
            try {
                // const userId = req.query
                const conversation = await Conversation.find({
                    members: { $in: [userId] },
                })
                console.log(conversation)
                res.status(200).json(conversation);
                return resolve()
            } catch (err) {
                res.status(500).json(err)
                return resolve()
            }
           }

    } 
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);