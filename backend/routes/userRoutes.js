const userRoutes = require("express").Router();
const userController = require("../controllers/User");
const authMiddleware = require("../middlewares/authMiddleware");
const rolesMiddleware = require("../middlewares/rolesMiddleware");

userRoutes.patch(
  "/users/:id",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  userController.update // Оновлює роль користувача
);

module.exports = userRoutes;
