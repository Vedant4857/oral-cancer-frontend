import React from "react";

export default function PredictionResult({ prediction }) {
  if (!prediction) {
    return (
      <p className="text-sm text-gray-500 italic">
        No prediction yet. Upload an image to get started.
      </p>
    );
  }

  const { label, confidence } = prediction;
  const isHighRisk = confidence >= 75;

  return (
    <div
      className={`mt-3 p-4 rounded-xl border ${
        isHighRisk
          ? "bg-red-50 border-red-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`font-semibold ${
              isHighRisk ? "text-red-700" : "text-green-700"
            }`}
          >
            {label}
          </div>
          <div className="text-sm text-gray-600">
            Confidence: {confidence}%
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${
            isHighRisk
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isHighRisk ? "⚠️ Action Recommended" : "✔️ Low Risk"}
        </span>
      </div>

      <div className="mt-3 text-sm leading-relaxed text-gray-700">
        {isHighRisk
          ? "This result suggests a higher probability. Please seek clinical follow-up. (Demo result — consult a qualified doctor for confirmation.)"
          : "Low probability result. If symptoms persist, consult a clinician for further evaluation."}
      </div>
    </div>
  );
}
