const CatsModel = require("../models/Cat");
const asyncHandler = require("express-async-handler");
const HttpError = require("../helpers/HttpError");
const CatsService = require("../services/CatsService");

class Cats {
  add = asyncHandler(async (req, res) => {
    const { name, age } = req.body;
    const { id } = req.user;
    if (!name || !age) {
      res.status(400);
      throw new Error("Provide all required fields");
      // throw HttpError(400, "Provide all required fields");
    }

    const cat = await CatsModel.create({ ...req.body, owner: id });
    res.status(201);
    res.json({ code: 201, message: "Success", data: cat });
  });

  fetchAll = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const cats = await CatsModel.find({ owner: id });

    res.status(200);
    res.json({
      code: 200,
      message: "Success",
      data: cats,
      quantity: cats.length,
    });
  });

  fetchOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const cat = await CatsModel.findById(id);
    const cat = await CatsService.findCat(id);

    if (!cat) {
      res.status(404);
      throw new Error(`Not found by id: ${id}`);
    }

    res.status(200);
    res.json({
      code: 200,
      message: "Success",
      data: cat,
    });
  });

  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cat = await CatsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cat) {
      res.status(404);
      throw new Error(`Not found by id: ${id}`);
    }

    res.status(200);
    res.json({
      code: 200,
      message: "Success",
      data: cat,
    });
  });

  removeOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cat = await CatsModel.findByIdAndRemove(id);

    if (!cat) {
      res.status(404);
      throw new Error(`Not found by id: ${id}`);
    }

    res.status(200);
    res.json({
      code: 200,
      message: "Success",
      data: cat,
    });
  });
}

module.exports = new Cats();
