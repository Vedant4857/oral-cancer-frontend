import React from "react";
import UploadImage from "./components/UploadImage";
import SymptomTracker from "./components/SymptomTracker";
import Reminders from "./components/Reminders";
import Chatbot from "./components/Chatbot";
import Translation from "./components/Translation";
import ContentTabs from "./components/ContentTabs";
import Hospitals from "./components/Hospitals";


export default function App() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">Oral Cancer Detection & Support</h1>
          <p className="text-sm text-gray-600 mt-1">Upload an image, track symptoms, set reminders, and access support resources.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <UploadImage />
            <ContentTabs />
          </section>

          <aside className="space-y-6">
            <SymptomTracker />
            <Reminders />
            <Translation />
            <Chatbot />
            <Hospitals />
          </aside>
        </main>
      </div>
    </div>
  );
}
