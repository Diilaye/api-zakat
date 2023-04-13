const contactModel  = require('../models/contact');

const projectModdel = require('../models/project');

const message  =  require('../utils/message');


exports.store  = async (req,res,next) => {

    try {
        let {
            phone,
            email,
            sexe,
            description,
            nom,
            prenom,
            city ,
            profile,
            project
        } = req.body;

        const contact  = contactModel();

        contact.phone = phone;

        contact.email = email;

        contact.sexe = sexe;

        contact.description = description;

        contact.nom = nom;

        contact.prenom = prenom;

        contact.city = city;

        contact.profile = profile;

        const contactSave = await contact.save();

        const projectFind = await  projectModdel.findById(project).exec();

        projectFind.contact.push(contactSave);

        return message.response(res,message.createObject('Contact'),201,contactSave);

    } catch (error) {

       return message.response(res , message.error() ,404 , error);
    
    }

}

exports.all = async  (req, res ,next) => {

    try {
        
        const contactFind = await contactModel.find(req.query).exec();

       return message.response(res,message.findObject('Contact'),200,contactFind);

    } catch (error) {
        return message.response(res, message.error(),404,error); 
    }

}

exports.one  = async (req,res,next)=>{
    try {
        let {id} =req.params;
        const contactFind = await contactModel.findById(id).exec();

       return message.response(res,message.findObject('Contact'),200,contactFind);

    } catch (error) {
        return message.response(res, message.error(),404,error); 
    }
}

exports.update = async  (req,res,next)=> {

    try {
        let {
            phone,
            email,
            sexe,
            description,
            nom,
            prenom,
            city ,
            profile
        } = req.body;

        const contact  = contactModel.findById(req.params.id);

        if (phone != undefined) {
            contact.phone = phone;  
        }

        if (email != undefined) {
            contact.email = email;  
        }

        if (sexe != undefined) {
            contact.sexe = sexe;  
        }

        if (description != undefined) {
            contact.description = description;  
        }

        if (nom != undefined) {
            contact.nom = nom;  
        }

        if (prenom != undefined) {
            contact.prenom = prenom;  
        }

        if (city != undefined) {
            contact.city = city;  
        }

        if (profile != undefined) {
            contact.profile = profile;  
        }

        

        const contactSave = await contact.save();

        return message.response(res,message.updateObject('Contact'),200,contactSave);

    } catch (error) {

       return message.response(res , message.error() ,404 , error);
    
    }
}

exports.delete = async (req,res ,next) =>  {
    try {
        let {id} =req.params;
        const contactFind = await contactModel.findById(id).exec();
        const rows  = contactFind.delete();

       return message.response(res,message.deleteObject('Contact'),200,rows);

    } catch (error) {
        return message.response(res, message.error(),404,error); 
    }
}

