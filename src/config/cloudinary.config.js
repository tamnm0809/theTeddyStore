import { v2 as cloudinary } from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dchefcs07",
  api_key: "366994417113435",
  api_secret: "pFv06ognVfXk6BM-NgTkjHkZZ8o",
  secure: true,
});

// Hàm tải ảnh lên Cloudinary
const uploadImageToCloudinary = async (imageName) => {
  const result = await cloudinary.upload(`path/to/your/images/${imageName}`, {
    folder: "teddy-store", // Tên thư mục trên Cloudinary
  });
  return result.public_id;
};

// Ví dụ sử dụng
const imageNameFromDatabase = "example.jpg";
const publicId = await uploadImageToCloudinary(imageNameFromDatabase);
