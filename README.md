# 🎥 Mini Image Gallery

A full-stack image uploading system built using React (Vite) and Node.js + Express, allowing users to upload, preview, delete, and reorder images.
It uses in-memory storage on the backend and features a beautiful Pinterest-style UI, drag & drop, modal preview, and duplicate prevention.

---

## 🚀 Features

- 📤 Upload Image:
  - Drag & drop
  - Preview before upload
  - Upload progress bar
  - Prevent duplicate upload (same file / same image)
    
- 🖼️ Responsive Gallery:
  - Masonry layout (Pinterest style)
  - Images shown in original aspect ratio

- 🔍 Image Viewer:
  - Click any image to expand
  - Zoom in/out (double-click)
  - Keyboard navigation (← → Esc)
  - Next/Previous buttons
  - Download image option
    
- 🗂️ Image Management
  - Delete image
  - Drag & drop reorder
  - Duplicate filename + duplicate content protection
  - Instant UI updates
    
- ⚙️ Backend Features
  - Memory-based image storage
  - Multer in-memory upload
  - Image validation (type + size + existence)
  - REST APIs for upload, delete, retrieve

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- HTML5
- Masonry CSS

### Backend
- Node.js + Express
- Multer (in-memory)
- CORS
- Base64 encoding for images

---

## 📂 Project Structure

```bash
Mini-Image-Gallery/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Gallery.jsx
│ │ │ ├── ImageCard.jsx
│ │ │ ├── ImageGrid.jsx
│ │ │ ├── ImageModal.jsx
│ │ │ ├── ProgressBar.jsx
│ │ │ ├── UploadBox.jsx
│ │ │ ├── UploadCard.jsx
│ │ │ └── Toast.jsx
│ │ ├── api.js
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .env
│ ├── .gitignore
│ └── public/
│
├── server/ 
│ ├── index.js
│ ├── package.json
│ └── .gitignore
└── README.md
```
---

## ⚙️ Setup Instructions

### 🔑 Prerequisites
- Node.js (v18+ recommended)
- Git

### 🔧 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/im-akash-prajapati-1/Mini-Image-Gallery.git
   cd Mini-Image-Gallery
   
2. **Setup backend**
   ```bash
   cd server
   npm install  
   ```
   **Create .env in server/:**
   ```bash
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```
   **Start server:**
   ```bash
   npm run dev
   ```
     
3. **Setup frontend**
   ```bash
   cd client
   npm install
   ```
   **Start client:**
   ```bash
   npm run dev
   ```
### **📊 Sample Report**

- Upload images
- See live preview
- See real aspect-ratio images in a Pinterest layout
- Zoom, download, and navigate modal
- Reorder images via drag & drop
- Delete images
- Prevent duplicate uploads

**🔒 Security Notes**

- .env is ignored in Git.

**👨‍💻 Author**
Akash Prajapati

Akash Prajapati

**📜 License**

This project is for educational & assignment purposes. Free to use with attribution.
