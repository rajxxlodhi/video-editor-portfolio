const Service = require("../models/Service");
const asyncHandler = require("../utils/asyncHandler");

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: 1 });
  res.json(services);
});

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  Object.assign(service, req.body);
  const updatedService = await service.save();
  res.json(updatedService);
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  await service.deleteOne();
  res.json({ message: "Service deleted." });
});

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
