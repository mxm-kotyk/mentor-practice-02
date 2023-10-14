module.exports = (req, res) => {
  res.status(404);
  res.json({ code: 404, message: "URL not found" });
};
