import { useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";

function App() {

  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <MainLayout setCurrentPage={setCurrentPage}>

      {currentPage === "dashboard" && <Dashboard />}

      {currentPage === "upload" && <UploadPage />}

    </MainLayout>
  );
}

export default App;