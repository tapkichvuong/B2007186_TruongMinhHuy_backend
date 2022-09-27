const apiError = require("../apiError");
const ContactService = require("../services/contactServices");
const MongoDB = require("../utils/mongodbUtils");

exports.create = (req, res) =>{
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) =>{
    res.send({ message: "findAll handler" });
};
exports.findOne = (req, res) =>{
    res.send({ message: "findOne handler" });
};
exports.update = (req, res) =>{
    res.send({ message: "update handler" });
};
exports.delete = (req, res) =>{
    res.send({ message: "delete handler" });
};
exports.deleteAll = (req, res) =>{
    res.send({ message: "deleteAll handler" });
};
exports.findAllFavorite = (req, res) =>{
    res.send({ message: "findAllFavorite handler" });
};

// Create and save a new Contact

exports.create = async(req, res, next) => {
    if(!req.body?.name){
        return next(new apiError(400, "Name can not be empty"));
    }

    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    } catch(error){
        return next(new apiError(500, " An error occurred while creating the contact"));
    }
}