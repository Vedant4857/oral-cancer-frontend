import React from "react";

export default function PredictionResult({ prediction }) {
  if (!prediction) {
    return <p className="text-sm text-gray-500">No prediction yet. Upload an image to get started.</p>;
  }

  const { label, confidence } = prediction;
  const isHighRisk = confidence >= 75;

  return (
    <div className={`mt-3 p-3 rounded-lg ${isHighRisk ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-gray-600">Confidence: {confidence}%</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-md font-medium" style={{ background: isHighRisk ? "#fee2e2" : "#ecfdf5" }}>
          {isHighRisk ? "Action recommended" : "Low risk"}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-700">
        {isHighRisk
          ? "This result suggests a higher probability — advise clinical follow-up. (This is a demo result; confirm with a doctor.)"
          : "Low probability result — if symptoms persist, consult a clinician."}
      </div>
    </div>
  );
}
