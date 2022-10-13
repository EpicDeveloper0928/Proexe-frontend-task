import {Navigate, Route, Routes} from "react-router-dom";

import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
