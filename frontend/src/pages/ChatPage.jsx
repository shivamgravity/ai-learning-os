import { useState } from "react";

import { askQuestion } from "../services/api";

function ChatPage() {

  const [query, setQuery] = useState("");

  const [answer, setAnswer] = useState("");

  const [sources, setSources] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {

    if (!query.trim()) return;

    try {

      setLoading(true);

      const result = await askQuestion(query);

      setAnswer(result.answer);

      setSources(result.sources);

    } catch (error) {

      console.error(error);

      setAnswer("Failed to get response.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-5xl">

      <h2 className="text-3xl font-bold mb-6">
        AI Learning Assistant
      </h2>

      {/* Input Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question from your uploaded study materials..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white min-h-[120px] outline-none"
        />

        <button
          onClick={handleAskQuestion}
          disabled={loading}
          className="mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

      </div>

      {/* Answer Section */}
      {answer && (
        <div className="mt-8">

          <h3 className="text-2xl font-semibold mb-4">
            AI Response
          </h3>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-200 whitespace-pre-wrap leading-8">
              {answer}
            </p>

          </div>

        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mt-8">

          <h3 className="text-2xl font-semibold mb-4">
            Sources
          </h3>

          <div className="space-y-4">

            {sources.map((source, index) => (

              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              >

                <div className="flex justify-between items-center mb-3">

                  <p className="text-sm text-zinc-400">
                    {source.source}
                  </p>

                  <p className="text-sm text-zinc-500">
                    Similarity Distance: {source.distance}
                  </p>

                </div>

                <p className="text-zinc-300 whitespace-pre-wrap">
                  {source.text}
                </p>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default ChatPage;