import { useState } from "react";
import Dashboard from './components/Dashboard';
import AthenaChat from "./components/AthenaChat";

function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "chat">("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimal Control Bar */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setActiveView(activeView === "dashboard" ? "chat" : "dashboard")}
          className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-700 text-sm font-bold hover:shadow-md transition-all"
        >
          {activeView === "dashboard" ? "💬 Open Chat" : "📊 Dashboard"}
        </button>
      </div>

      {/* Main Content */}
      <main>
        {activeView === "dashboard" ? (
          <Dashboard />
        ) : (
          <div className="p-12 pt-24">
            <AthenaChat />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;