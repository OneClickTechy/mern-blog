import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footercom from "./components/Footer";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <Footercom />
      </div>
    </BrowserRouter>
  );
}
