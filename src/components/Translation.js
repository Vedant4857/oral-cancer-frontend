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
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Instructions — Translate</h3>
      <select value={lang} onChange={(e) => setLang(e.target.value)} className="mb-3 p-2 border rounded w-full">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
      </select>

      <div className="p-3 bg-gray-50 rounded text-sm">{translations[lang]}</div>
    </div>
  );
}
