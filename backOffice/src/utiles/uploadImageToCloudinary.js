import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bbyzsc2y'); // Cloudinary preset for unsigned uploads

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dbnpcuzdf/image/upload',
      formData
    );
    return response.data.secure_url; // This URL is the uploaded image's location
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};
