const asyncHandler = require("express-async-handler");
const contactModel = require("../model/contactModel");

const getcontacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const postcontact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

const getcontact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contack not found");
    }
    res.status(200).json(contact);
});

const updatecontact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contack not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(200).json(updatedContact);
});

const deletecontact = asyncHandler(async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contack not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    await contactModel.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});


module.exports =
    {getcontacts,
    postcontact,
    getcontact, 
    updatecontact, 
    deletecontact}