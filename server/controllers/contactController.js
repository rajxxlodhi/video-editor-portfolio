const Contact = require("../models/Contact");
const asyncHandler = require("../utils/asyncHandler");

const createContact = asyncHandler(async (req, res) => {
  const { name, email, projectType, budget, message } = req.body;

  if (!name || !email || !projectType || !budget || !message) {
    res.status(400);
    throw new Error("Please complete all required fields.");
  }

  const contact = await Contact.create(req.body);
  res.status(201).json({
    message: "Thanks. Your project inquiry has been received.",
    contact
  });
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = { createContact, getContacts };
