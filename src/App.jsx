import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/Home.jsx";
import Apply2 from "./pages/apply2.jsx"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Public pages */}
        <Route path="project" element={<Project />} />
        <Route path="project/detail/:id" element={<ProjectDetail />} />
        <Route path="people" element={<People />} />
        <Route path="recruit" element={<RecruitGuidePage />} />

        {/* Sidebar (Admin) pages */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />

        {/* apply pages */}
        <Route path="apply/test" element={<Apply2/>} />
      </Route>
    </Routes>
  );
}

export default App;
