function Dashboard() {
  return (
    <div>

      <h2 className="text-4xl font-bold">
        AI Learning OS
      </h2>

      <p className="mt-4 text-zinc-400 max-w-2xl">
        Upload your notes, textbooks, and PDFs to create
        an offline AI-powered personalized learning system.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-semibold">
            Summaries
          </h3>

          <p className="mt-2 text-zinc-400">
            Generate simplified explanations and summaries.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-semibold">
            Mind Maps
          </h3>

          <p className="mt-2 text-zinc-400">
            Visualize concepts and relationships.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-semibold">
            Quizzes
          </h3>

          <p className="mt-2 text-zinc-400">
            Create personalized revision questions.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;