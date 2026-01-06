import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home/Home";
import Project from "./pages/project/Project.jsx";
import ProjectDetail from "./pages/project/project-detail/ProjectDetail.jsx";
import People from "./pages/people/People.jsx";
import RecruitGuidePage from "./pages/RecruitGuidePage/RecruitGuidePage";
import Apply2 from "./pages/apply2.jsx";
import LayoutAdmin from "./layouts/adminlayout.jsx";

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="project" element={<Project />} />
        <Route path="project/detail/:id" element={<ProjectDetail />} />
        <Route path="people" element={<People />} />
        <Route path="recruit" element={<RecruitGuidePage />} />
        <Route path="apply/test" element={<Apply2 />} />
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>

      {/* 테스트용 Admin Layout (Layout 바깥) */}
      <Route path="admin/preview" element={<LayoutAdmin />}>
      </Route>
    </Routes>
  );
}

export default App;
