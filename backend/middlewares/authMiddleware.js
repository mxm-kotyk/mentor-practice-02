const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Отримуємо токен
  // розшифровуємо токен
  // Передаємо інфо з токена далі
  try {
    if (!req.headers.authorization) {
      res.status(400);
      res.json({ code: 400, message: "Unauthorized" });
    }
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      const decoded = jwt.verify(token, "cat");
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401);
    res.json({ code: 401, message: error.message });
  }
};

// {
//   students: [ 'Max', 'Igor', 'Den', 'Anastasia' ],
//   id: '653be51c38a7a11de379fb37',
//   iat: 1698425369,
//   exp: 1698443369
// }
