import React, { useState } from "react";

export default function ContentTabs() {
  const [tab, setTab] = useState("nutrition");
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex gap-2 mb-3">
        <button onClick={() => setTab("nutrition")} className={`px-3 py-1 rounded ${tab==="nutrition" ? "bg-indigo-600 text-white" : "border"}`}>Nutrition</button>
        <button onClick={() => setTab("selfcare")} className={`px-3 py-1 rounded ${tab==="selfcare" ? "bg-indigo-600 text-white" : "border"}`}>Self-care</button>
        <button onClick={() => setTab("treatment")} className={`px-3 py-1 rounded ${tab==="treatment" ? "bg-indigo-600 text-white" : "border"}`}>Treatment Plan</button>
      </div>

      <div className="text-sm">
        {tab === "nutrition" && (
          <div>
            <h4 className="font-semibold mb-1">Nutrition advice</h4>
            <ul className="list-disc ml-5">
              <li>Prefer soft, nutrient-dense foods if mouth is sore.</li>
              <li>Hydrate frequently — small sips throughout the day.</li>
              <li>Include protein-rich foods for healing.</li>
            </ul>
          </div>
        )}
        {tab === "selfcare" && (
          <div>
            <h4 className="font-semibold mb-1">Self-care</h4>
            <p>Maintain oral hygiene, avoid tobacco/alcohol, and monitor symptoms.</p>
          </div>
        )}
        {tab === "treatment" && (
          <div>
            <h4 className="font-semibold mb-1">Treatment plan (general)</h4>
            <p>Follow clinician guidance. Scans/biopsy may be required for confirmation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
