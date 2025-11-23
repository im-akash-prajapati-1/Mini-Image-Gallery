import { useState, useEffect } from "react";

export default function UploadBox({ onFileSelect, resetTrigger }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    setPreview(null);
    setFileName("");
  }, [resetTrigger]);

  const handleFile = (file) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      onFileSelect(null, "Only JPEG/PNG allowed");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      onFileSelect(null, "Max size is 3MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);

    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="w-full">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition 
          ${
            isDragging
              ? "bg-indigo-100 border-indigo-400"
              : "bg-gray-50 border-gray-300 hover:bg-gray-100"
          }
        `}
      >
        {preview ? (
          <img
            src={preview}
            className="h-full object-contain rounded"
            alt="preview"
          />
        ) : (
          <span className="text-gray-600 font-medium">
            Click or Drag & Drop an image
          </span>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {preview && (
        <div className="mt-2 text-sm text-center text-gray-700">
          {fileName}
        </div>
      )}
    </div>
  );
}
