import { useState } from "react";

import { generateSummary } from "../services/api";

function StudyToolsPage() {

  const [topic, setTopic] = useState("");

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {

    if (!topic.trim()) return;

    try {

      setLoading(true);

      const result = await generateSummary(topic);

      setSummary(result.summary);

    } catch (error) {

      console.error(error);

      setSummary("Failed to generate summary.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-5xl">

      <h2 className="text-3xl font-bold mb-6">
        AI Study Tools
      </h2>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleGenerateSummary();
            }
          }}
          placeholder="Enter a topic from uploaded materials..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white outline-none"
        />

        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className="mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

      </div>

      {summary && (

        <div className="mt-8">

          <h3 className="text-2xl font-semibold mb-4">
            Summary
          </h3>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-200 whitespace-pre-wrap leading-8">
              {summary}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default StudyToolsPage;