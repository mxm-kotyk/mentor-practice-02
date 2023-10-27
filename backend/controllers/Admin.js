const asyncHandler = require("express-async-handler");

class Admin {
  adminPage = asyncHandler(async (req, res, next) => {
    const { roles } = req.user;
    const { id } = req.params;
    const { role } = req.body;

    res.status(200);
    res.send("Admin Page");
  });
}

module.exports = new Admin();
