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

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileObj(f);
    setPreview(URL.createObjectURL(f));
    setPrediction(null);
  };

  const addToHistory = (rec) => {
    setHistory((h) => [rec, ...h].slice(0, 20)); // keep last 20
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileObj) {
      alert("Choose an image first.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    // --- DUMMY response (or replace with real API) ---
    await new Promise(r => setTimeout(r, 800));
    const fakeConfidence = Math.floor(60 + Math.random() * 35);
    const fakeLabel = fakeConfidence > 75 ? "Likely Oral Cancer" : "Benign / Low risk";
    const rec = { date: new Date().toLocaleString(), label: fakeLabel, confidence: fakeConfidence, filename: fileObj.name || "image" };
    setPrediction({ label: rec.label, confidence: rec.confidence });
    addToHistory(rec);
    setLoading(false);
    // -------------------------------------------------
  };

  const clearHistory = () => {
    if (!window.confirm("Clear upload history?")) return;
    setHistory([]);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-bold text-lg mb-3">Upload Mouth Image</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input aria-label="Upload mouth image" type="file" name="image" accept="image/*" onChange={handleFile} />
        {preview && <img src={preview} alt="preview" className="w-48 h-48 object-cover rounded-md border" />}
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
          <button type="button" className="px-3 py-2 border rounded-lg text-sm" onClick={() => { setPreview(null); setPrediction(null); setFileObj(null); }}>
            Reset
          </button>
        </div>
      </form>

      <div className="mt-4">
        <PredictionResult prediction={prediction} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Upload History</h4>
          <button className="text-sm text-red-500" onClick={clearHistory}>Clear</button>
        </div>
        {history.length === 0 ? <p className="text-sm text-gray-500 mt-2">No uploads yet</p> : (
          <ul className="mt-2 space-y-2">
            {history.map((h, i) => (
              <li key={i} className="p-2 bg-gray-50 rounded text-sm flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">{h.date}</div>
                  <div><strong>{h.label}</strong> — {h.confidence}%</div>
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
