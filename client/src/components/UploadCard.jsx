import React, { useState } from 'react';
import axios from 'axios';

export default function UploadCard({ apiBase, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [pct, setPct] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png'].includes(f.type)) {
      alert('Only JPEG and PNG allowed.');
      return;
    }
    if (f.size > 3 * 1024 * 1024) {
      alert('File too large; max 3MB.');
      return;
    }
    setFile(f);
  };

  const upload = async () => {
    if (!file) return alert('Choose a file first.');
    const form = new FormData();
    form.append('image', file);
    try {
      setUploading(true);
      setPct(0);
      const res = await axios.post(`${apiBase}/upload`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          const percent = Math.round((evt.loaded / evt.total) * 100);
          setPct(percent);
        }
      });
      onUploadSuccess(res.data);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
      setPct(0);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFile}
          disabled={uploading}
        />
        <button
          onClick={upload}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          disabled={uploading}
        >
          Upload
        </button>
        {uploading && <div className="ml-4 text-sm">Uploading: {pct}%</div>}
      </div>

      {uploading && (
        <div className="w-full bg-slate-100 h-2 rounded mt-3">
          <div style={{ width: `${pct}%` }} className="h-2 rounded bg-indigo-600" />
        </div>
      )}

      {!uploading && file && (
        <div className="mt-3 text-sm text-slate-600">Ready to upload: {file.name} ({Math.round(file.size/1024)} KB)</div>
      )}
    </div>
  );
}
