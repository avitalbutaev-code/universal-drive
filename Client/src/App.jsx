// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Folder from "./pages/folder";
import File from "./pages/file";
import Bin from "./pages/bin";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home layout with nested routes */}
        <Route path="/home" element={<Home />}>
          <Route path="folder/:folderId" element={<Folder />} />
          <Route path="file/:fileId" element={<File />} />
          <Route path="bin" element={<Bin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
