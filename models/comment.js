const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsModel = new Schema({

    user : {
        type: Schema.Types.ObjectId,
        ref :'users'
    },

    descrption : {
        type: String,
        default :''
    },

    likes : [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],

    comments:[{
        type: Schema.Types.ObjectId,
        ref :'comments',
        default :[]
    }],
  
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('comments', CommentsModel) ;