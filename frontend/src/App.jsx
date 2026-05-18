import { useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ChatPage from ".pages/ChatPage";

function App() {

  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <MainLayout setCurrentPage={setCurrentPage}>

      {currentPage === "dashboard" && <Dashboard />}

      {currentPage === "upload" && <UploadPage />}

      {currentPage === "chat" && <ChatPage />}

    </MainLayout>
  );
}

export default App;