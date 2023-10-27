// Cannot GET /api/v1/cats
// Додати кота
// Отримати всіх котів
// Отримати одного
// Оновити кота
// Видалити кота
const catsController = require("../controllers/Cats");
const authMiddleware = require("../middlewares/authMiddleware");
const isValidId = require("../middlewares/isValidId");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const validateBody = require("../middlewares/validateBody");
const bodySchema = require("../schemas/bodySchema");
const bodyUpdateSchema = require("../schemas/bodyUpdateSchema");

const catsRoutes = require("express").Router();

catsRoutes.post(
  "/cats",
  // validateBody(bodySchema),
  authMiddleware,
  catsController.add
);

// ["ADMIN", "MODERATOR", "USER", "CTO"]

catsRoutes.get(
  "/cats",
  authMiddleware,
  rolesMiddleware(["ADMIN", "MODERATOR", "USER"]),
  catsController.fetchAll
);

catsRoutes.get("/cats/:id", isValidId, catsController.fetchOne);

catsRoutes.patch(
  "/cats/:id",
  // validateBody(bodyUpdateSchema),
  catsController.updateOne
);

catsRoutes.delete("/cats/:id", catsController.removeOne);

module.exports = catsRoutes;

// const user = {
//   name: "Max",
//   status: "admin",
//   siOnline: false,
// };
// put;
// user.siOnline = true;
// patch;
// user.siOnline = true;
