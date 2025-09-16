import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/(public)/login";
import Dashboard from "./pages/(protected)/dashboard";
import Home from "./pages/(public)/home";
import ProtectedLayout from "./pages/(protected)/layout";
import PublicLayout from "./pages/(public)/layout";
import AuthProvider from "./layout/AuthProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
