import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

// PUBLIC_INTERFACE
function App() {
  /**
   * PUBLIC_INTERFACE
   * Root application component with responsive layout and routing.
   */
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Content>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
