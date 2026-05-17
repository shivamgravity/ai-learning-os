function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        
        {/* Sidebar */}
        <aside className="w-64 h-screen border-r border-zinc-800 p-4">
          <h1 className="text-2xl font-bold">
            AI Learning OS
          </h1>

          <nav className="mt-8 space-y-4">
            <div className="text-zinc-400 hover:text-white cursor-pointer">
              Dashboard
            </div>

            <div className="text-zinc-400 hover:text-white cursor-pointer">
              Upload Notes
            </div>

            <div className="text-zinc-400 hover:text-white cursor-pointer">
              Mind Maps
            </div>

            <div className="text-zinc-400 hover:text-white cursor-pointer">
              Quizzes
            </div>
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