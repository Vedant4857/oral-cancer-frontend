import React, { useState, useEffect } from "react";

const STORAGE_KEY = "oc_reminders_v1";

export default function Reminders() {
  const [list, setList] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Failed saving reminders", e);
    }
  }, [list]);

  const add = () => {
    if (!text.trim()) return;
    setList((p) => [{ id: Date.now(), text, done: false }, ...p]);
    setText("");
  };

  const toggle = (id) =>
    setList((p) =>
      p.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
    );

  const remove = (id) => setList((p) => p.filter((x) => x.id !== id));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-1">
        Treatment Reminders
      </h3>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Take medicine at 9 AM"
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={add}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          Add
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {list.length === 0 && (
          <div className="text-sm text-gray-500 italic">No reminders yet</div>
        )}
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded border"
          >
            <label className="flex items-center gap-2">
              <input
                aria-label={`Mark ${item.text}`}
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                className="w-4 h-4 text-indigo-600"
              />
              <span
                className={
                  item.done ? "line-through text-gray-400" : "font-medium"
                }
              >
                {item.text}
              </span>
            </label>
            <button
              onClick={() => remove(item.id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
