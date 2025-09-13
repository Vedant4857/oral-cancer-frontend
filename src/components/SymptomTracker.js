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
    const active = Object.keys(checked).filter(k => checked[k]);
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
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Symptom Tracker</h3>
      <div className="space-y-1">
        {defaultSymptoms.map((s) => (
          <label className="flex items-center gap-2" key={s}>
            <input aria-label={s} type="checkbox" checked={!!checked[s]} onChange={() => toggle(s)} />
            <span className="text-sm">{s}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={addEntry} className="px-3 py-1 bg-indigo-600 text-white rounded">Add Entry</button>
        <button onClick={clearHistory} className="px-3 py-1 border rounded text-sm">Clear</button>
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-sm">History</h4>
        {entries.length === 0 ? <p className="text-sm text-gray-500">No entries yet</p> : (
          <ul className="space-y-2 mt-2">
            {entries.map((e, i) => (
              <li key={i} className="text-sm p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">{e.date}</div>
                <div>{e.symptoms.join(", ")}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
