import { getUploadSignature } from "../api/client";

export const uploadToCloudinary = async (file, resourceType = "auto") => {
  const { data } = await getUploadSignature({
    folder: "video-editor-portfolio",
    resourceType
  });

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", data.apiKey);
  uploadData.append("timestamp", data.timestamp);
  uploadData.append("signature", data.signature);
  uploadData.append("folder", data.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${data.cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: uploadData
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  return response.json();
};
