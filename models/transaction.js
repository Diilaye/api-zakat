const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionModel = new Schema({
    
    reference: {
        type: String 
    },

    amount : {
        type : String
    },

    token : {
        type : String
    },

    project : {
        type: Schema.Types.ObjectId,
        ref: "project"
    },

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    type: {
        type: String,
        enum: ['ZAKAT', 'DON'],
        default: 'ZAKAT'
    },
    
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS','CANCELED'],
        default: 'PENDING'
    },

    date: {
        type: Date,
        default: Date.now()
    },
},{
    toJSON: {
        transform: function (doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
});

module.exports = mongoose.model('transactions', transactionModel) ;