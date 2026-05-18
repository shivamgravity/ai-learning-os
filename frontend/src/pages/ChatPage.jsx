import { useState } from "react";

import { askQuestion } from "../services/api";

function ChatPage() {

  const [query, setQuery] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {

    if (!query.trim()) return;

    const userMessage = {
      role: "user",
      content: query
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuery = query;

    setQuery("");

    try {

      setLoading(true);

      const history = messages.map(
        (msg) => msg.content
      );

      const result = await askQuestion(
        currentQuery,
        history
      );

      const assistantMessage = {
        role: "assistant",
        content: result.answer,
        sources: result.sources
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get response.",
          sources: []
        }
      ]);

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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAskQuestion();
            }
          }}
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

      <div className="mt-8 space-y-6">

        {messages.map((message, index) => (

          <div key={index}>

            {/* User Message */}
            {message.role === "user" && (

              <div className="flex justify-end">

                <div className="bg-white text-black px-5 py-4 rounded-2xl max-w-3xl">

                  <p className="whitespace-pre-wrap">
                    {message.content}
                  </p>

                </div>

              </div>

            )}

            {/* Assistant Message */}
            {message.role === "assistant" && (

              <div className="flex justify-start">

                <div className="bg-zinc-900 border border-zinc-800 px-5 py-4 rounded-2xl max-w-4xl w-full">

                  <div className="flex items-center gap-2 mb-4">

                    <div className="w-2 h-2 rounded-full bg-green-400"></div>

                    <p className="text-zinc-400 text-sm">
                      AI Learning Assistant
                    </p>

                  </div>

                  <p className="text-zinc-200 whitespace-pre-wrap leading-8">
                    {message.content}
                  </p>

                  {/* Sources */}
                  {message.sources?.length > 0 && (

                    <details className="mt-6">

                      <summary className="cursor-pointer text-zinc-400 hover:text-white">

                        View Sources
                      </summary>

                      <div className="mt-4 space-y-4">

                        {message.sources.map((source, sourceIndex) => (

                          <div
                            key={sourceIndex}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                          >

                            <div className="flex justify-between items-center mb-3">

                              <p className="text-sm text-zinc-400">
                                {source.source}
                              </p>

                              <p className="text-sm text-zinc-500">
                                Distance: {source.distance}
                              </p>

                            </div>

                            <p className="text-zinc-300 whitespace-pre-wrap">
                              {source.text}
                            </p>

                          </div>

                        ))}

                      </div>

                    </details>

                  )}

                </div>

              </div>

            )}

          </div>

        ))}

        {/* Loading */}
        {loading && (

          <div className="flex justify-start">

            <div className="bg-zinc-900 border border-zinc-800 px-5 py-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <div className="animate-pulse w-2 h-2 rounded-full bg-green-400"></div>

                <p className="text-zinc-300">
                  Thinking...
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ChatPage;