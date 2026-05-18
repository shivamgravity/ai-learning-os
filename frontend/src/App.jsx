import { useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ChatPage from "./pages/ChatPage";
import StudyToolsPage from "./pages/StudyToolsPage";

function App() {

  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <MainLayout setCurrentPage={setCurrentPage}>

      {currentPage === "dashboard" && <Dashboard />}

      {currentPage === "upload" && <UploadPage />}

      {currentPage === "chat" && <ChatPage />}

      {currentPage === "study-tools" && (
        <StudyToolsPage />
      )}

    </MainLayout>
  );
}

export default App;