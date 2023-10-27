const adminRoutes = require("express").Router();
const adminController = require("../controllers/Admin");
const authMiddleware = require("../middlewares/authMiddleware");
const rolesMiddleware = require("../middlewares/rolesMiddleware");

adminRoutes.get(
  "/",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  adminController.adminPage // Оновлює роль користувача
);

module.exports = adminRoutes;
