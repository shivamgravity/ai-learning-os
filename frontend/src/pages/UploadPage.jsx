import { useRef, useState } from "react";
import { uploadPDF } from "../services/api";

function UploadPage() {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [hasText, setHasText] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {

      setMessage("Uploading...");

      const result = await uploadPDF(selectedFile);

      setMessage(result.message);
      setPreview(result.preview || "");
      setHasText(result.has_text);

    } catch (error) {

      console.error(error);
      setMessage("Upload failed.");

    }
  };

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Upload Study Material
      </h2>

      <div className="border-2 border-dashed border-zinc-700 p-10 rounded-2xl bg-zinc-900">

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Select File Button */}
        <button
          onClick={handleChooseFile}
          className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl"
        >
          Choose PDF File
        </button>

        {/* Selected File */}
        {selectedFile && (
          <p className="mt-4 text-zinc-300">
            Selected File: {selectedFile.name}
          </p>
        )}

        {/* Upload Button */}
        <div className="mt-6">

          <button
            onClick={handleUpload}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80"
          >
            Upload PDF
          </button>

        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-zinc-400">
            {message}
          </p>
        )}

        {!hasText && (
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
            <p className="text-yellow-300">
            No extractable text found. This PDF may contain scanned or handwritten pages.
            OCR support will be added soon.
            </p>
        </div>
        )}

        {hasText && preview && (
        <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
            Extracted Preview
            </h3>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl max-h-96 overflow-y-auto">

            <p className="text-zinc-300 whitespace-pre-wrap">
                {preview}
            </p>

            </div>

        </div>
        )}

      </div>

    </div>
  );
}

export default UploadPage;