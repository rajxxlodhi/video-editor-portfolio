const { cloudinary, configureCloudinary } = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");

const getUploadSignature = asyncHandler(async (req, res) => {
  const configured = configureCloudinary();

  if (!configured) {
    res.status(503);
    throw new Error("Cloudinary environment variables are not configured.");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = req.body.folder || "video-editor-portfolio";
  const resourceType = req.body.resourceType || "auto";
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    folder,
    resourceType,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  });
});

module.exports = { getUploadSignature };
