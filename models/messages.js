import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const message = new Schema(
    {
        conversationId : {
            type : String,
        },
        sender : {
            type : String,
        },
        text : {
            type : String,
        },
    },

{ timestamps: true },

);

mongoose.models = {};

let MessageSchema = mongoose.model('Message', message);

export default MessageSchema;