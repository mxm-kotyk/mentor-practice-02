const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    return next();
  } else {
    res.status(404);
    throw new Error(`${id} is not valid id`);
  }
};
