// Cannot GET /api/v1/cats
// Додати кота
// Отримати всіх котів
// Отримати одного
// Оновити кота
// Видалити кота
const catsController = require("../controllers/Cats");
const isValidId = require("../middlewares/isValidId");
const validateBody = require("../middlewares/validateBody");
const bodySchema = require("../schemas/bodySchema");
const bodyUpdateSchema = require("../schemas/bodyUpdateSchema");

const catsRoutes = require("express").Router();

catsRoutes.post(
  "/cats",
  // validateBody(bodySchema),
  catsController.add
);

catsRoutes.get("/cats", catsController.fetchAll);

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
