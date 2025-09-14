import React, { useState, useEffect } from "react";

const STORAGE_KEY = "oc_symptoms_v1";
const defaultSymptoms = [
  "Mouth ulcer",
  "Unusual lump",
  "Bleeding",
  "Persistent pain",
  "Difficulty swallowing"
];

export default function SymptomTracker() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Failed saving symptoms", e);
    }
  }, [entries]);

  const toggle = (sym) => setChecked((p) => ({ ...p, [sym]: !p[sym] }));

  const addEntry = () => {
    const active = Object.keys(checked).filter((k) => checked[k]);
    if (active.length === 0) return alert("Select at least one symptom.");
    const newEntry = { date: new Date().toLocaleString(), symptoms: active };
    setEntries((p) => [newEntry, ...p]);
    setChecked({});
  };

  const clearHistory = () => {
    if (!window.confirm("Clear symptom history?")) return;
    setEntries([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-1">
        Symptom Tracker
      </h3>

      <div className="space-y-1">
        {defaultSymptoms.map((s) => (
          <label
            className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded"
            key={s}
          >
            <input
              aria-label={s}
              type="checkbox"
              checked={!!checked[s]}
              onChange={() => toggle(s)}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="text-sm">{s}</span>
          </label>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={addEntry}
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow text-sm"
        >
          Add Entry
        </button>
        <button
          onClick={clearHistory}
          className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-semibold text-indigo-700">History</h4>
        {entries.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No entries yet</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {entries.map((e, i) => (
              <li
                key={i}
                className="text-sm p-2 bg-gray-50 rounded border"
              >
                <div className="text-xs text-gray-500">{e.date}</div>
                <div className="font-medium">{e.symptoms.join(", ")}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
