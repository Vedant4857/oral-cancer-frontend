import React, { useState } from "react";

export default function ContentTabs() {
  const [tab, setTab] = useState("nutrition");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      {/* Title */}
      <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-1">
        Guidance & Advice
      </h3>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("nutrition")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "nutrition"
              ? "bg-indigo-600 text-white shadow"
              : "border text-gray-700 hover:bg-gray-50"
          }`}
        >
          Nutrition
        </button>
        <button
          onClick={() => setTab("selfcare")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "selfcare"
              ? "bg-indigo-600 text-white shadow"
              : "border text-gray-700 hover:bg-gray-50"
          }`}
        >
          Self-care
        </button>
        <button
          onClick={() => setTab("treatment")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === "treatment"
              ? "bg-indigo-600 text-white shadow"
              : "border text-gray-700 hover:bg-gray-50"
          }`}
        >
          Treatment Plan
        </button>
      </div>

      {/* Tab content */}
      <div className="text-sm text-gray-700 leading-relaxed">
        {tab === "nutrition" && (
          <div>
            <h4 className="font-semibold mb-2 text-indigo-700">
              Nutrition Advice
            </h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Prefer soft, nutrient-dense foods if the mouth is sore.</li>
              <li>Hydrate frequently — take small sips throughout the day.</li>
              <li>Include protein-rich foods to support healing.</li>
            </ul>
          </div>
        )}

        {tab === "selfcare" && (
          <div>
            <h4 className="font-semibold mb-2 text-indigo-700">Self-care</h4>
            <p>
              Maintain good oral hygiene, avoid tobacco and alcohol, and
              carefully monitor any persistent symptoms.
            </p>
          </div>
        )}

        {tab === "treatment" && (
          <div>
            <h4 className="font-semibold mb-2 text-indigo-700">
              Treatment Plan (General)
            </h4>
            <p>
              Always follow your clinician’s guidance. Scans or a biopsy may be
              required for confirmation, and timely follow-up is important.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
