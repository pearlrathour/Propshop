const Business = require("../models/business");
const Service = require("../models/service");

module.exports.createService = async (req, res) => {
  const business = await Business.findById(req.params.id);
  console.log(req.body);
  const service = new Service(req.body.service);
  await service.save();
  await business.save();
};