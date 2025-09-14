import React, { useState } from "react";

const sampleText = `If you notice a persistent ulcer or lump, please consult a clinician.`;

export default function Translation() {
  const [lang, setLang] = useState("en");

  // NOTE: placeholder translations. Replace with API integration for real translations.
  const translations = {
    en: sampleText,
    hi: "यदि आप लगातार कोई घाव या गाठ देखते हैं, तो कृपया चिकित्सक से परामर्श करें।",
    mr: "जर तुम्हाला सतत जखम किंवा गाठ दिसत असेल तर कृपया डॉक्टरांशी सल्ला घ्या.",
    ta: "மீறி ஒரு புண் அல்லது கட்டி இருந்தால், மருத்துவரை அணுகவும்."
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-1">
        Instructions — Translate
      </h3>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="mb-3 p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
      </select>

      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed">
        {translations[lang]}
      </div>
    </div>
  );
}
