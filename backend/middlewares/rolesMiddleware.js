const jwt = require("jsonwebtoken");

module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {
      const { roles } = req.user;
      let hasRole = false;

      roles.forEach((role) => {
        if (rolesArr.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        res.status(403);
        throw new Error("Forbidden");
      }

      next();
    } catch (error) {
      res.status(403);
      res.json({ code: 403, message: error.message });
    }
  };
};

// {
//   students: [ 'Max', 'Igor', 'Den', 'Anastasia' ],
//   id: '653bf4f6b02944a3db0d28b8',
//   roles: [ 'ADMIN' ],
//   iat: 1698428241,
//   exp: 1698446241
// }
