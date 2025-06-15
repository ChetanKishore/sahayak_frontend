import React, { useState } from 'react';

const SingleFileUploader = ({
  label,
  fieldName,
  formData,
  updateFormData,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSizeMB = 10, // Maximum file size in MB
}) => {
  const [file, setFile] = useState(formData[fieldName] || null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;

    // Validate file size
    const fileSizeMB = newFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB} MB limit.`);
      return;
    }

    // Validate file type
    if (!accept.split(',').includes(`.${newFile.name.split('.').pop().toLowerCase()}`)) {
      setError('Invalid file type.');
      return;
    }

    setError('');
    setFile(newFile);
    updateFormData({ ...formData, [fieldName]: newFile });
  };

  const removeFile = () => {
    setFile(null);
    updateFormData({ ...formData, [fieldName]: null });
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-[#003198]">{label}</label>
      <label
        htmlFor={fieldName}
        className="cursor-pointer bg-[#4F46E5] text-white text-xs font-medium py-1 px-3 rounded hover:bg-[#3F3EE5] w-fit transition"
      >
        Choose File
      </label>
      <input
        id={fieldName}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}

      {file && (
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            onClick={removeFile}
          >
            &times;
          </button>
          <p
            className="text-green-600 text-xs cursor-pointer underline"
            onClick={() => setPreviewUrl(URL.createObjectURL(file))}
          >
            {file.name} (Preview)
          </p>
        </div>
      )}

      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewUrl(null)}
        >
          {file.type.includes('pdf') ? (
            <embed
              src={previewUrl}
              type="application/pdf"
              className="max-h-[80%] max-w-[90%] border-4 border-white rounded shadow-lg"
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-[80%] max-w-[90%] border-4 border-white rounded shadow-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SingleFileUploader;
