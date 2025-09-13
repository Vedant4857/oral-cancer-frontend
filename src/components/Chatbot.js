import React, { useState } from "react";

/**
 * Menu-driven chatbot (no backend).
 * - Edit the FLOW object to change questions / answers / options.
 * - The component stores a simple conversation array for display.
 */

const FLOW = {
  welcome: {
    text: "Hello — I'm your Oral Health Assistant. Pick a topic below and I'll guide you.",
    options: [
      { id: "symptoms", label: "Track Symptoms" },
      { id: "sores", label: "Mouth Sores / Ulcers" },
      { id: "pain", label: "Pain / Discomfort" },
      { id: "advice", label: "Self-care Advice" },
      { id: "app_help", label: "How to use this app" }
    ]
  },

  symptoms: {
    text: "Which symptom best describes your concern?",
    options: [
      { id: "ulcer", label: "Persistent ulcer" },
      { id: "lump", label: "Lump or swelling" },
      { id: "bleeding", label: "Unexplained bleeding" },
      { id: "other_symp", label: "Other symptoms" }
    ]
  },

  sores: {
    text: "Mouth sores can be benign or need review. Did the sore persist more than 2 weeks?",
    options: [
      { id: "sores_yes", label: "Yes — >2 weeks" },
      { id: "sores_no", label: "No — <2 weeks" }
    ]
  },

  pain: {
    text: "Is the pain severe enough to affect eating or speaking?",
    options: [
      { id: "pain_yes", label: "Yes, severe" },
      { id: "pain_no", label: "Mild/moderate" }
    ]
  },

  advice: {
    text: "Self-care tips: maintain oral hygiene, avoid tobacco/alcohol, soft foods when sore. Want more?",
    options: [
      { id: "nutrition", label: "Nutrition tips" },
      { id: "hygiene", label: "Oral hygiene" },
      { id: "follow_clinic", label: "When to see a doctor" }
    ]
  },

  app_help: {
    text: "This app can help you track symptoms, set reminders, and analyze images. Which feature do you want help with?",
    options: [
      { id: "how_upload", label: "How to upload image" },
      { id: "how_remind", label: "How to set reminders" },
      { id: "how_history", label: "Where history is stored" }
    ]
  },

  // Terminal responses for specific option ids:
  responses: {
    ulcer: "Persistent ulcers over 2 weeks should be clinically evaluated. Consider booking a clinician visit.",
    lump: "A lump or swelling should be checked by a professional; avoid self-massage and consult a doctor.",
    bleeding: "Unexplained bleeding needs urgent review. If heavy, seek immediate care.",
    other_symp: "If symptoms persist or worsen, it's best to consult a clinician for evaluation.",
    sores_yes: "Because it’s lasted >2 weeks, we advise clinical follow-up for diagnosis.",
    sores_no: "If it resolves soon, maintain hygiene and monitor. If not, contact a clinician.",
    pain_yes: "Severe pain affecting daily life should be examined by a clinician.",
    pain_no: "Try gentle salt rinses, soft diet, and pain relief as recommended by your doctor.",
    nutrition: "Eat soft, high-protein foods (eggs, lentils), avoid spicy/acidic food if mouth is sore.",
    hygiene: "Brush gently, use a soft brush, and rinse with salt water. Avoid tobacco & alcohol.",
    follow_clinic: "See a doctor if symptoms persist >2 weeks, or if you have lumps, bleeding, or severe pain.",
    how_upload: "Go to Upload Image → Choose file → Analyze Image. Use good lighting and clean the mouth gently.",
    how_remind: "Go to Treatment Reminders → type a reminder and click Add. Reminders persist in your browser.",
    how_history: "Upload history and symptom logs are stored locally in your browser. They aren’t sent anywhere by default."
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: FLOW.welcome.text }
  ]);
  const [currentNode, setCurrentNode] = useState("welcome");

  // helper to push a bot message and optionally options
  const pushBot = (text) => {
    setMessages((m) => [...m, { from: "bot", text }]);
  };
  const pushUser = (text) => {
    setMessages((m) => [...m, { from: "user", text }]);
  };

  const handleOption = (optionId, optionLabel) => {
    // record user's selection
    pushUser(optionLabel);

    // If optionId maps to a follow-up node (like 'symptoms', 'sores')
    // check FLOW for a node with that key
    if (FLOW[optionId]) {
      // there is a follow-up question node
      const node = FLOW[optionId];
      // small delay to feel conversational
      setTimeout(() => {
        pushBot(node.text);
        setCurrentNode(optionId);
      }, 350);
      return;
    }

    // else if there is a terminal response for the chosen id, show it
    const resp = FLOW.responses?.[optionId];
    if (resp) {
      setTimeout(() => {
        pushBot(resp);
        // after giving terminal response, return to welcome options
        setTimeout(() => {
          pushBot(FLOW.welcome.text);
          setCurrentNode("welcome");
        }, 600);
      }, 350);
      return;
    }

    // fallback - return to welcome
    setTimeout(() => {
      pushBot("Sorry, I don't have an answer for that. Returning to main menu.");
      pushBot(FLOW.welcome.text);
      setCurrentNode("welcome");
    }, 350);
  };

  const handleRestart = () => {
    setMessages([{ from: "bot", text: FLOW.welcome.text }]);
    setCurrentNode("welcome");
  };

  // get options for current node
  const currentOptions = FLOW[currentNode]?.options || [];

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col h-96">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Assistant</h3>
        <button onClick={handleRestart} className="text-xs text-gray-500 hover:underline">Restart</button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] ${m.from === "bot" ? "text-left" : "text-right ml-auto"}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.from === "bot" ? "bg-white text-gray-800" : "bg-blue-600 text-white"}`}>
              <div className="text-sm">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        {currentOptions.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {currentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOption(opt.id, opt.label)}
                className="px-3 py-2 text-sm bg-white border rounded hover:bg-gray-100"
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-400">No options — choose Restart to start again.</div>
        )}
      </div>
    </div>
  );
}
