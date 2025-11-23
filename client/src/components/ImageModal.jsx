import { useEffect, useState } from "react";

export default function ImageModal({ images = [], index, onClose, onNext, onPrev }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onNext, onPrev]);

  if (index === null) return null;
  const img = images[index];
  if (!img) return null;

  const handleDoubleClick = () => setZoomed((z) => !z);
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = img.filename || `image-${img.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[95vw] p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-2 -right-2 bg-white text-black rounded-full px-3 py-1 shadow"
          onClick={onClose}
        >
          ✕
        </button>

        {index > 0 && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl"
            onClick={onPrev}
          >
            ‹
          </button>
        )}

        {index < images.length - 1 && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl"
            onClick={onNext}
          >
            ›
          </button>
        )}

        <div className="flex justify-center items-center">
          <img
            src={img.dataUrl}
            alt={img.filename || ""}
            onDoubleClick={handleDoubleClick}
            className={`max-h-[80vh] max-w-[90vw] object-contain rounded shadow-lg transition-transform duration-300 ${
              zoomed ? "scale-125" : "scale-100"
            }`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-sm text-white truncate max-w-[60vw]">
            {img.filename}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="bg-white text-black px-3 py-1 rounded shadow"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
