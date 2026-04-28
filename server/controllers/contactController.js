const ContactMessage = require('../models/ContactMessage');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newContactMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    const savedMessage = await newContactMessage.save();
    res.status(201).json({ success: true, data: savedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/admin/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact messages', error: error.message });
  }
};

// @desc    Get unread contact messages count
// @route   GET /api/admin/contact/unread-count
// @access  Private/Admin
const getUnreadCount = async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unread count', error: error.message });
  }
};

// @desc    Mark all contact messages as read
// @route   PUT /api/admin/contact/mark-read
// @access  Private/Admin
const markAllRead = async (req, res) => {
  try {
    await ContactMessage.updateMany({ isRead: false }, { $set: { isRead: true, status: 'read' } });
    res.json({ message: 'All messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking messages as read', error: error.message });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/admin/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (message) {
      res.json({ message: 'Contact message removed' });
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact message', error: error.message });
  }
};

module.exports = {
  submitContactMessage,
  getAllContacts,
  getUnreadCount,
  markAllRead,
  deleteContact,
};
