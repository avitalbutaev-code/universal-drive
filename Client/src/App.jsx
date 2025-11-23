// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Folders from "./pages/folder";
import File from "./pages/file";
import Bin from "./pages/bin";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />}>
          <Route path="/folder" element={<Folders />} />
          <Route path="/file/:id" element={<File />} />
          <Route path="/bin" element={<Bin />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
