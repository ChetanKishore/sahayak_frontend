import React, { useState } from 'react';

const GalleryUploader = ({ formData, updateFormData, maxSizeMB = 5 }) => {
  const [galleryImages, setGalleryImages] = useState(formData.galleryImages || []);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const handleGalleryFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if adding these files exceeds 6 images
    if (galleryImages.length + files.length > 6) {
      setError('You can upload up to 6 images only.');
      return;
    }

    // Validate and filter files
    const validFiles = files.filter((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      const ext = file.name.split('.').pop().toLowerCase();
      const validTypes = ['jpg', 'jpeg', 'png'];
      if (fileSizeMB > maxSizeMB) {
        setError(`File ${file.name} exceeds ${maxSizeMB} MB limit.`);
        return false;
      }
      if (!validTypes.includes(ext)) {
        setError(`Invalid file type: ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setError('');
    const updatedImages = [...galleryImages, ...validFiles];
    setGalleryImages(updatedImages);
    updateFormData({ ...formData, galleryImages: updatedImages });
  };

  const removeImage = (index) => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
    updateFormData({
      ...formData,
      galleryImages: updatedImages
    });
  };

  return (
    <div>
      <label className="text-sm font-semibold text-[#003198]">Upload Gallery Photos (Multiple Images)</label>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="galleryUpload"
          className="cursor-pointer bg-[#4F46E5] text-white text-xs font-medium py-1 px-3 rounded hover:bg-[#3F3EE5] w-fit transition"
        >
          Choose Files
        </label>
        <input
          id="galleryUpload"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          onChange={handleGalleryFileChange}
          className="hidden"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        {galleryImages.length > 0 && (
          <p className="text-green-600 text-xs">
            {galleryImages.length} file(s) selected
          </p>
        )}
      </div>

      {galleryImages.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-semibold text-[#003198] mb-2">Manage Gallery</p>
          <div className="flex flex-wrap gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative border-2 border-gray-300 rounded overflow-hidden w-24 flex flex-col items-center"
              >
                {/* Cross Button */}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  &times;
                </button>

                {/* Image */}
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gallery ${index}`}
                  className="object-cover w-full h-24 cursor-pointer"
                  onClick={() => setPreviewUrl(URL.createObjectURL(image))}
                  title="Click to preview"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewUrl(null)}
        >
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-[80%] max-w-[90%] border-4 border-white rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryUploader;
