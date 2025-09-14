import React, { useState, useEffect } from "react";
import PredictionResult from "./PredictionResult";

const STORAGE_KEY = "oc_uploads_v1";

export default function UploadImage() {
  const [preview, setPreview] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  // Handlers...
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileObj(f);
    setPreview(URL.createObjectURL(f));
    setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileObj) return alert("Choose an image first.");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const fakeConfidence = Math.floor(60 + Math.random() * 35);
    const fakeLabel =
      fakeConfidence > 75 ? "Likely Oral Cancer" : "Benign / Low risk";

    const rec = {
      date: new Date().toLocaleString(),
      label: fakeLabel,
      confidence: fakeConfidence,
      filename: fileObj.name,
    };

    setPrediction({ label: rec.label, confidence: rec.confidence });
    setHistory((h) => [rec, ...h].slice(0, 20));
    setLoading(false);
  };

  const clearHistory = () => {
    if (!window.confirm("Clear upload history?")) return;
    setHistory([]);
  };

  // ✅ Return starts here (inside function)
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-1">
        Upload Mouth Image
      </h2>

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-cover rounded-md border"
          />
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setPrediction(null);
              setFileObj(null);
            }}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Result */}
      <div className="mt-4">
        <PredictionResult prediction={prediction} />
      </div>

      {/* History */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Upload History</h4>
          <button onClick={clearHistory} className="text-sm text-red-500">
            Clear
          </button>
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">No uploads yet</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {history.map((h, i) => (
              <li
                key={i}
                className="p-2 bg-gray-50 rounded text-sm flex justify-between"
              >
                <div>
                  <div className="text-xs text-gray-500">{h.date}</div>
                  <div>
                    <strong>{h.label}</strong> — {h.confidence}%
                  </div>
                </div>
                <div className="text-xs text-gray-400">{h.filename}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
