require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Project = require("./models/Project");
const Service = require("./models/Service");
const Testimonial = require("./models/Testimonial");
const Contact = require("./models/Contact");
const { projects, services, testimonials } = require("./data/sampleData");

const seed = async () => {
  await connectDB();

  await Promise.all([
    Project.deleteMany(),
    Service.deleteMany(),
    Testimonial.deleteMany(),
    Contact.deleteMany(),
    User.deleteMany()
  ]);

  await User.create({
    name: process.env.ADMIN_NAME || "Admin",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "change-this-password",
    role: "admin"
  });

  await Project.insertMany(projects);
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);

  console.log("Database seeded successfully.");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
