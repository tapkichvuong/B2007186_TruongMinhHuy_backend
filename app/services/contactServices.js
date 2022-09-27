const { ObjectID } = require("mongodb");

class ContactService {
    constructor(client) {
        this.contact = client.db().collection("contact");
    }
    // define database access methods using mongodb API
    extraContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite
        }
        //remove undefined fields
        Objects.keys(contact).foreach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extraContactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact, 
            { $set: {favorite: contact.favorite === true}},
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }
}

module.exports = ContactService;