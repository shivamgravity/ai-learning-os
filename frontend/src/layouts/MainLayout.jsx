function MainLayout({ children, setCurrentPage }) {

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 h-screen border-r border-zinc-800 p-4">

          <h1 className="text-2xl font-bold">
            AI Learning OS
          </h1>

          <nav className="mt-8 space-y-4">

            <button
              onClick={() => setCurrentPage("dashboard")}
              className="block text-zinc-400 hover:text-white"
            >
              Dashboard
            </button>

            <button
              onClick={() => setCurrentPage("upload")}
              className="block text-zinc-400 hover:text-white"
            >
              Upload Notes
            </button>

            <button
              onClick={() => setCurrentPage("chat")}
              className="block text-zinc-400 hover:text-white"
            >
              AI Chat
            </button>

          </nav>

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;