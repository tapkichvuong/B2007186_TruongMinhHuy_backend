const apiError = require("../apiError");
const ContactService = require("../services/contactService");
const MongoDB = require("../utils/mongodbUtils");

// Create and save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new apiError(400, "Name can not be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new apiError(500, " An error occurred while creating the contact")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const ContactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await ContactService.findByName(name);
        } else {
            documents = await ContactService.find({});
        }
    } catch (error) {
        return next(
            new apiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};


exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(
                new apiError(404, "Contact not found")
            );
        }
        return res.send(document);
    } catch (error) {
        return next(
            new apiError(500, `Error retrieving contact with id = ${req.params.id}`)
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(erq.body).length === 0) {
        return next(
            new apiError(400, "Date to update can not be empty")
        );
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(
                new apiError(404, "Contact not found")
            );
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new apiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(
                new apiError(404, "Contact not found")
            );
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new apiError(500, `Could not deleted with id=${req.params.id}`)
        );
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new apiError(500, "An error occurred while remove all contacts")
        );
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new apiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};
