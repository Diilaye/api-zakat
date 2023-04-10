const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    
    phone: {
        type: String,
        required : true,
        unique : true
    },

    active : {
        type: String,
        default :'active'
    },


    email: {
        type: String,
    },


    password: {
        type: String,
    },

    passwords : {
        type : Array
    },
    
    role: {
        type : String,
        enum: ['admin', 'super','particulier' ],
        default: 'particulier'
    },

    imageCard :  {
        type: Schema.Types.ObjectId,
        ref: "media"
    },

    NameofIDCard  : {       
        type : String,
        enum: ['National', 'Voter', 'Driver', 'Passport', ],
        default: 'National'
    },

    NumberfIDCard: {
        type: String,
        default :""
    },

    MaritalStatut  : {
        type : String,
        enum: ['Married', 'Unmarried' ],
        default: 'Married'
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
        type: Schema.Types.ObjectId,
        ref: "media"
    },


    avatar : {
        type: Schema.Types.ObjectId,
        ref: "media"
    },
    

    nom  : {
        type : String,
        default :""
    },

  

    prenom  : {
        type : String,
        default :""
    },

    contry : {
        type : String,
        default :""
    },

    city : {
        type : String,
        default :""
    },

    projects : [{
        type: Schema.Types.ObjectId,
        ref: "project",
        default : []
    }],


    zakat : [{
        type: Schema.Types.ObjectId,
        ref: "zakat",
        default :[]
    }],

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction"
    }],

    hasAcceptedNewsletter : {
        type : Boolean,
        default : false
    },
    
    token : {
        type : String,
        default : ""
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
        delete ret.password;
        delete ret.passwords;
        delete  ret.token;
        delete ret.__v;
      },
    },
  },{
    timestamps: true 
  });

module.exports = mongoose.model('users', UserModel) ;