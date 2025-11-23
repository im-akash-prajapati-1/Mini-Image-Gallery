import { useEffect, useState } from "react";
import Toast from "./components/Toast";
import UploadBox from "./components/UploadBox";
import ProgressBar from "./components/ProgressBar";
import ImageGrid from "./components/ImageGrid";
import ImageModal from "./components/ImageModal";

import {
  fetchImagesAPI,
  uploadImageAPI,
  deleteImageAPI,
} from "./api";

export default function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);

  const [resetUploadBox, setResetUploadBox] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    try {
      const res = await fetchImagesAPI();
      setImages(Array.isArray(res.data) ? res.data : []);
    } catch {
      showToast("Failed to load images", "error");
      setImages([]);
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async () => {
    if (!file) return showToast("No file selected!", "error");
    if (images.some((img) => img.filename === file.name)) {
      return showToast("image already exists!", "error");
    }
    const fileBase64 = await convertToBase64(file);
    if (images.some((img) => img.dataUrl === fileBase64)) {
      return showToast("image already exists!", "error");
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setProgress(0);

      const res = await uploadImageAPI(formData, (e) => {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      });

      setImages((prev) => [res.data, ...prev]);
      setFile(null);
      setProgress(0);
      setResetUploadBox((v) => !v);

      showToast("Uploaded successfully!");
    } catch (err) {
      showToast(err?.response?.data?.error || "Upload failed", "error");
    }
  };

  // Delete
  const deleteImage = async (id) => {
    try {
      await deleteImageAPI(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      showToast("Image deleted!");
    } catch {
      showToast("Delete failed", "error");
    }
  };

  // Modal navigation
  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const nextImage = () => {
    setModalIndex((i) => (i < images.length - 1 ? i + 1 : i));
  };
  const prevImage = () => {
    setModalIndex((i) => (i > 0 ? i - 1 : i));
  };

  // Drag & Drop
  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragEnter = (e, index) => e.preventDefault();
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });

    setDraggedIndex(null);
    showToast("Reordered images");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-6xl">
        <Toast toast={toast} />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🌄 Mini Image Gallery
        </h1>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <UploadBox
            resetTrigger={resetUploadBox}
            onFileSelect={(file, error) => {
              if (error) return showToast(error, "error");
              setFile(file);
            }}
          />
          <button
            onClick={uploadImage}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Upload Image
          </button>
          <ProgressBar progress={progress} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Uploaded Images
          </h2>
          <ImageGrid
            images={images}
            onDelete={deleteImage}
            onOpen={openModal}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </div>
      </div>
      <ImageModal
        images={images}
        index={modalIndex}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
