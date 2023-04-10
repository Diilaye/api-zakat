const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactModel = new Schema({
    
    phone: {
        type: String,
        required : true,
    },

    email: {
        type: String,
    },

   
    sexe: {
        type : String,
        enum: ['homme', 'femme'],
        default: 'homme'
    },

    description : {
        type: String,
        default :""
    },

    profile : {
        type: String,
        default :""
    },

    nom  : {
        type : String,
        default :""
    },

    prenom  : {
        type : String,
        default :""
    },

    city : {
        type : String,
        default :""
    },

   
    date: {
        type: Date,
        default: Date.now()
    }
},{
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },{
    timestamps: true 
  });

module.exports = mongoose.model('contact', ContactModel) ;