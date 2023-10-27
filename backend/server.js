const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
const express = require("express");
require("colors");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: configPath });
const connectDb = require("../config/connectDb");
const notFoundUrl = require("./middlewares/notFoundUrl");
const errorHandler = require("./middlewares/errorHandler");
const User = require("./models/User");
const { func } = require("joi");
const authMiddleware = require("./middlewares/authMiddleware");
const Roles = require("./models/Roles");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1", require("./routes/catsRoutes"));
app.use("/api/v1", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// Реєстрація - збереження користувача в базу даних
// Аутентифікація - перевірка даних, які надав користувач з тими даними, які зберігаються в БД
// Авторизація - перевірка прав доступу
// Логаут - вихід із системи

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // Отримуємо і валідуємо дані від користувача
    // Шукаємо, чи є такий користувача в БД
    // Якщо знайшли - повідомляємо, що такий юзер існує
    // Якщо не знайшли то хешуємо пароль
    // Зберігаємо в базу із захешованим паролем

    const { password, email } = req.body;
    if (!password || !email) {
      res.status(400);
      throw new Error("Provide all required fields");
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(409);
      throw new Error("User already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const roles = await Roles.findOne({ value: "USER" });

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.value],
    });

    res.status(201);
    res.json({
      code: 201,
      message: "Success",
      data: { name: newUser.name, email: newUser.email },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // Отримуємо і валідуємо дані від користувача
    // Шукаємо, чи є такий користувача в БД, і розшифровуємо пароль
    // Якщо не знайшли або не розшифрували пароль - Invalid login or password
    // Якщо знайшли і розшифрували пароль - генеруємо токен
    // Зберігаємо в базу із токеном

    const { password, email } = req.body;

    if (!password || !email) {
      res.status(400);
      throw new Error("Provide all required fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid login or password");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      res.status(400);
      throw new Error("Invalid login or password");
    }

    const token = generateToken({
      students: ["Max", "Igor", "Den", "Anastasia"],
      id: user._id,
      roles: user.roles,
    });

    user.token = token;
    await user.save();

    res.status(200);
    res.json({
      code: 200,
      message: "Success",
      data: { email: user.email, token: user.token },
    });
  })
);

app.patch(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // Отримуємо користувача
    // Видаляємо його токен
    const { id } = req.user;
    const user = await User.findById(id);

    user.token = null;
    await user.save();

    res.status(200);
    res.json({
      code: 200,
      message: "Logout success",
    });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "cat", { expiresIn: "5h" });
}

const { PORT } = process.env;

app.use(notFoundUrl);

app.use(errorHandler);

connectDb();

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`.italic.green.bold);
});
