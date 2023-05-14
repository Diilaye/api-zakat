
const authModel = require('../models/auth');

const codePhoneModel = require('../models/code-phone');

const fileModel  =  require('../models/file');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

var ObjectID = require('mongodb').ObjectID

const axios = require('axios');

const message  =  require('../utils/message');

require('dotenv').config({
    path: './.env'
});

exports.store = async (req , res , next) => {
    
 
    try {
        
        const auth = authModel() ;
  
    auth.phone = req.body.phone ;
    auth.role = req.body.role ;

const token = jwt.sign({
    id_user: auth._id,
    roles_user : auth.role , 
    phone_user : auth.phone
}, process.env.JWT_SECRET, { expiresIn: '8784h' });

auth.token = token; 

const authSave = await auth.save();

return message.response(res, message.updateObject('Users') ,  201,{
    role : authSave.role , 
    phone : authSave.phone , 
    token ,
} );


    
    } catch (error) {
    
        res.status(404).json({
            message: 'Erreur création',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    
    }
}


exports.auth = async  ( req, res ,_ ) => {
    
   try {
    if(req.body.phone != undefined) {

        const user = await authModel.findOne({
            phone : req.body.phone

        }).exec();

        if (user) {
            if (bcrytjs.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id_user: user.id,
                    role_user : user.role , 
                    phone_user : user.phone
                }, process.env.JWT_SECRET, { expiresIn: '8784h' });
                user.token = token  ;
                await  user.save();
                return res.json({
                    message: 'Connection réussssi',
                    status: 'OK',
                    data: {
                        user : user ,
                        token : token
                    },
                    statusCode: 200
                });
            } else {
                return res.status(401).json({
                    message: 'Identifiant  Incorrect',
                    status: 'NOT OK',
                    data:  "error identifiant",
                    statusCode: 401
                });
            }
        } else {
            message.response(res , message.error() ,404 , "Identifiant  Incorrect");
        }
        
        
    }

   } catch (error) {

    return  message.response(res , message.error() ,404 , error.stack);
   }


}



exports.findAuth = async (req , res, _ ) =>  {

    const user = await authModel.findById(req.user.id_user).exec();

    return message.response(res, message.updateObject('Users') ,  200,{token : user.token , phone : user.phone , role : user.role , user:user  } );


}

exports.update = async (req, res ,next ) => {

   
    
    try {
        console.log(req.body);

        const auth = await  authModel.findById(req.user.id_user);
            
        if (req.body.phone!=undefined) {
            auth.phone = req.body.phone ;
        }
        if (req.body.password !=undefined) {
            if(auth.password == undefined) {
                const passwordCrypt = bcrytjs.hashSync(req.body.password, salt);
                auth.passwords = auth.passwords.push(passwordCrypt);
                auth.password = passwordCrypt ;
            }else  {
                if (bcrytjs.compareSync(req.body.password, auth.password)) {
                    const passwordCrypt = bcrytjs.hashSync(req.body.newPassword, salt);
                    auth.passwords = auth.passwords.push(passwordCrypt);
                    auth.password = passwordCrypt ;
                }else {
                    return  message.response(res , message.error() ,404 , "les mot  de passe ne concorde pas");
                }
            }
           
    
        }
    
    
        if (req.body.nom !=undefined) {
            
            auth.nom = req.body.nom ;
    
        }
    
        if (req.body.prenom !=undefined) {
            
            auth.prenom = req.body.prenom ;
    
        }
    
        if (req.body.role !=undefined) {
            
            auth.role = req.body.role ;
    
        }
    
        if (req.body.email !=undefined) {
            
            auth.email = req.body.email ;
    
        }
    
        if (req.body.imageCard !=undefined) {
            
            auth.imageCard = req.body.imageCard ;
    
        }
    
        if (req.body.NameofIDCard !=undefined) {
            
            auth.NameofIDCard = req.body.NameofIDCard ;
    
        }

        if (req.body.NumberfIDCard !=undefined) {
            
            auth.NumberfIDCard = req.body.NumberfIDCard;
    
        }

        if (req.body.MaritalStatut !=undefined) {
            
            auth.MaritalStatut = req.body.MaritalStatut;
    
        }

        if (req.body.sexe !=undefined) {
            
            auth.sexe = req.body.sexe;
    
        }

        

        if (req.body.description !=undefined) {
            
            auth.description = req.body.description;
    
        }

        if (req.body.profile !=undefined) {
            
            auth.profile = req.body.profile;
    
        }

        if (req.body.avatar !=undefined) {

            auth.avatar = req.body.avatar;
    
        }

        if (req.body.contry !=undefined) {

            auth.contry = req.body.contry;
    
        }

        if (req.body.city !=undefined) {

            auth.city = req.body.city;
    
        }

        if (req.body.projects !=undefined) {

            auth.projects.push(req.body.projects) ;
    
        }

        if (req.body.zakat !=undefined) {

            auth.zakat.push(req.body.zakat) ;
    
        }

        if (req.body.transactions !=undefined) {

            auth.transactions.push(req.body.transactions) ;
    
        }
        

    
        const userUpdate =await  auth.save();
    
    
        const token = jwt.sign({
            id_user: auth._id,
            role_user : auth.role , 
            phone_user : auth.phone
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });
    
        return message.response(res, message.updateObject('Users')  , 200,{token , phone : auth.phone , role : auth.role , user:userUpdate  });
    

    } catch (error) {
       
       return  message.response(res , message.error() ,404 , error);
    }
}   

exports.delete = (req, res , next ) => authModel.findByIdAndDelete(req.user.id_user).then(result => {
   return  message.response(res , message.createObject('Code') ,201 , num);
}).catch( err =>  message.response(res , message.error() ,404 , err));

exports.verifNumberValid = async (req, res , next) => {

    
   
    
   try {
    
    const min = 1000;

    const max = 9999;

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    const phoneV = await authModel.findOne({
        phone :req.query.phone
    })

    if(phoneV ==null) {
        const newCode  = codePhoneModel();

        newCode.code = num;

        newCode.phone =  req.query.phone;

        const codeSave = await newCode.save();
        

        const updateCode = async () => {

            const i = await codePhoneModel.findById(codeSave._id);

            i.is_treat = true;

            const j = await i.save();
        }

        setTimeout(updateCode, 180000);

        let data = JSON.stringify({
            "from": "InfoSMS",
            "to": req.query.phone,
            "text": "Votre code de validation Verumed est le suivant: "+num 
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.freebusiness.sn/sms/1/text/single',
            headers: { 
            'authorization': 'Basic '+process.env.KEY_FREE+'==', 
            'Content-Type': 'application/json'
            },
            data : data
        };
        
        return axios.request(config)
        .then((_) => message.response(res , message.createObject('Code') ,201 , num))
        .catch((error) => message.response(res,message.error() ,400 , error));
    } else {
        return message.response(res , message.findObject('Telephone') ,200 , phoneV);
    }
   

   } catch (error) {
     return message.response(res,message.error() ,400 , error);
   }

    
}
exports.verifCode = async (req,res) =>  {

   

    try {

        const codes = await codePhoneModel.findOne({
            code : req.body.code,
            phone : req.body.phone,
            is_treat : false
        }) ;
    
        if(codes){
    
            codes.is_treat = true ;
    
            const auth = authModel();
    
            auth.phone = req.body.phone;
    
           const authSave =  await auth.save();
    
            const findAuth =  await authModel.findById(authSave.id).exec();
    
            const token = jwt.sign({
                id_user: authSave.id,
                roles_user : authSave.role , 
                phone_user : authSave.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
    
    
    
            findAuth.token =  token;
    
            const Sauth =  await findAuth.save();
    
           
    
            await codes.save();
            
            return message.response(res , message.findObject('Code') ,200 , {user : Sauth ,token :token});
            
        }
    
        return message.response(res , message.notFindObject('Code') ,400 , {});


    } catch (error) {

        message.response(res,message.error() ,400 , error);

    }

    
} 