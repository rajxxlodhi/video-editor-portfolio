const mongoose = require("mongoose");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

const getProjects = asyncHandler(async (req, res) => {
  const { category, featured, limit } = req.query;
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (featured === "true") {
    filter.featured = true;
  }

  const query = Project.find(filter).sort({ createdAt: -1 });
  if (limit) {
    query.limit(Number(limit));
  }

  const projects = await query;
  res.json(projects);
});

const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = mongoose.Types.ObjectId.isValid(id)
    ? await Project.findById(id)
    : await Project.findOne({ slug: id });

  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }

  res.json(project);
});

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }

  Object.assign(project, req.body);
  const updatedProject = await project.save();
  res.json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }

  await project.deleteOne();
  res.json({ message: "Project deleted." });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
