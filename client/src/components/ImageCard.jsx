import { useState } from "react";

export default function ImageCard({ img, index, onDelete, onOpen }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => onOpen(index)}
      className="relative bg-white rounded-lg shadow-md border cursor-pointer overflow-hidden"
    >
      <div className="overflow-hidden">
        <img
          src={img.dataUrl}
          alt={img.filename || ""}
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-auto object-contain block
            transform transition-transform duration-300 ease-out
            hover:scale-105
            ${loaded ? "animate-fade" : "opacity-0"}
          `}
        />
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(img.id);
        }}
        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
