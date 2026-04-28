const FarmStay = require('../models/FarmStay');

// @desc    Fetch all farm stays
// @route   GET /api/stays
// @access  Public
const getStays = async (req, res) => {
  try {
    const stays = await FarmStay.find({ isDeleted: { $ne: true } });
    res.json(stays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single farm stay
// @route   GET /api/stays/:id
// @access  Public
const getStayById = async (req, res) => {
  try {
    const stay = await FarmStay.findById(req.params.id);
    
    if (stay) {
      res.json(stay);
    } else {
      res.status(404).json({ message: 'Farm stay not found' });
    }
  } catch (error) {
    // If the ID is not a valid ObjectId, it will throw an error
    res.status(404).json({ message: 'Farm stay not found' });
  }
};

module.exports = {
  getStays,
  getStayById,
};
