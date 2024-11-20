"use client"


import React, { useState } from 'react';
import './PdfUpload.css'; // Import the CSS file

const PdfPreview = ({ fileUrl }) => {
  return (
    <div className="pdf-preview">
      <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />
    </div>
  );
};

const PdfUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(Array(4).fill(null));
  const [previewUrls, setPreviewUrls] = useState(Array(4).fill(''));

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);
    
    const reader = new FileReader();
    reader.onload = () => {
      const newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = reader.result;
      setPreviewUrls(newPreviewUrls);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pdf-upload">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="pdf-upload-form">
          <input type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={(e) => handleFileChange(e, index)} />
          <div className="pdf-preview-container">
            {previewUrls[index] && <PdfPreview fileUrl={previewUrls[index]} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfUpload;
