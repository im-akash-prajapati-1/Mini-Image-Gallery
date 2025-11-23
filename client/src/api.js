import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchImagesAPI = () => axios.get(`${API_URL}/images`);
export const uploadImageAPI = (formData, onProgress) =>
  axios.post(`${API_URL}/upload`, formData, { onUploadProgress: onProgress });
export const deleteImageAPI = (id) =>
  axios.delete(`${API_URL}/images/${id}`);
