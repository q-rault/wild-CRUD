const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },

  read: async (req, res) => {
    const result = await WilderModel.find({});
    res.json({ success: true, result });
  },

  update: async (req, res, next) => {
    try {
      const wilder = await WilderModel.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(200).json(wilder);
    } catch (error) {
      error.message = "error updating";
      return next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      // const result = await WilderModel.deleteMany({});
      const result = await WilderModel.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(204).json("");
      }
      res.json(result);
    } catch (error) {
      error.message = "error deleting";
      return next(error);
    }
  },
};
