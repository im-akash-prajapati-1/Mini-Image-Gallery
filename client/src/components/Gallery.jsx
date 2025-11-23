import React from 'react';

export default function Gallery({ images = [], onDelete }) {
  if (!images.length) return <div className="text-slate-600">No images yet.</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map(img => (
        <div key={img.id} className="bg-white rounded shadow overflow-hidden">
          <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
            <img src={img.dataUrl} alt={img.filename} className="object-contain h-full w-full" />
          </div>
          <div className="p-2 flex items-center justify-between">
            <span className="text-xs truncate">{img.filename}</span>
            <button
              onClick={() => {
                if (confirm('Delete this image?')) onDelete(img.id);
              }}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
