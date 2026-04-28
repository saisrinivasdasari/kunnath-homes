const Sport = require('../models/Sport');

// @desc    Get all sports
// @route   GET /api/sports
// @access  Public
const getSports = async (req, res) => {
  try {
    const sports = await Sport.find({});
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single sport
// @route   GET /api/sports/:id
// @access  Public
const getSportById = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    if (sport) {
      res.json(sport);
    } else {
      res.status(404).json({ message: 'Sport not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Sport not found' });
  }
};

module.exports = {
  getSports,
  getSportById,
};
