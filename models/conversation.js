import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const conversation = new Schema(
    {
        members : {
            type : Array,
        },
    },

{ timestamps: true },

);

mongoose.models = {};

let Conversation = mongoose.model('Conversation', conversation);

export default Conversation;