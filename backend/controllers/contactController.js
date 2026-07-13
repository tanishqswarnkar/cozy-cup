import Contact from '../models/Contact.js';

// @desc    Submit a contact form inquiry
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please provide name, email, and message');
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
