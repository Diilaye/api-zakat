const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectModel = new Schema({
    
    reference: {
        type: String 
    },

    amount : {
        type : String,
        default :""
    },

    pourcentage : {
        type : String,
        default :"10"
    },

    description : {
        type : String,
        default : ""
    },

    cover: {
        type: Schema.Types.ObjectId,
        ref: "media"
    },

    moddelEconomique:[{
        type: Schema.Types.ObjectId,
        ref: "media"
    }],

    moddelJuridique:[{
        type: Schema.Types.ObjectId,
        ref: "media"
    }],

    contact:[{
        type: Schema.Types.ObjectId,
        ref: "contact"
    }],


    tansactions : [{
        type: Schema.Types.ObjectId,
        ref: "transactions"
    }],

    views : [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],

    like : [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],

    comments : [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }],

    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    type: {
        type: String,
        enum: ['construction', 'it','business','service','production'],
        default: 'service'
    },
    
    status: {
        type: String,
        enum: ['PENDING', 'VALID','INVALID'],
        default: 'PENDING'
    },

    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('project', projectModel) ;