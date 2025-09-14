import React from "react";
import UploadImage from "./components/UploadImage";
import SymptomTracker from "./components/SymptomTracker";
import Reminders from "./components/Reminders";
import Chatbot from "./components/Chatbot";
import Hospitals from "./components/Hospitals";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">
          Oral Cancer Detection & Assistance
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UploadImage />
          <SymptomTracker />
          <Reminders />
          <Chatbot />
          <Hospitals className="md:col-span-2 lg:col-span-3" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 text-center text-sm p-3">
        ⚠️ This is a screening tool for educational/demo use only. Not a medical diagnosis.
      </footer>
    </div>
  );
}

export default App;
  