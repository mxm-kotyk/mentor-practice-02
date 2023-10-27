const CatsModel = require("../models/Cat");

class CatsService {
  findCat = async (id) => {
    const cat = await CatsModel.findById(id);
    return cat || null;
  };
}

module.exports = new CatsService();
