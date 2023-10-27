const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");

class User {
  update = asyncHandler(async (req, res, next) => {
    const { roles } = req.user;
    const { id } = req.params;
    const { role } = req.body;
    const user = await UserModel.findById(id);
    user.roles.push(role);
    await user.save();

    res.status(200);
    res.json({ code: 200, message: "Roles updated", data: user.roles });
  });
}

module.exports = new User();
