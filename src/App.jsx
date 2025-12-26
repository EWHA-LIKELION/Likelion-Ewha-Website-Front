import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="project" element={<div>PROJECT</div>} />
        <Route path="people" element={<div>PEOPLE</div>} />
        <Route path="recruit" element={<div>RECRUIT</div>} />
      </Route>
    </Routes>
  );
}

export default App;
