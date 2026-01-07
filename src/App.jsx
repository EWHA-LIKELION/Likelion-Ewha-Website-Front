import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home/Home";
import Project from "./pages/project/Project.jsx";
import ProjectDetail from "./pages/project/project-detail/ProjectDetail.jsx";
import People from "./pages/people/People.jsx";
import RecruitGuidePage from "./pages/RecruitGuidePage/RecruitGuidePage";
import RecruitPart from "./pages/recruit/RecruitPart.jsx";
import RecruitResult from "./pages/recruit/RecruitResult.jsx";
import Apply2 from "./pages/apply2.jsx";
import LayoutAdmin from "./layouts/adminlayout.jsx";
import Apply2Review from "./pages/apply2_review.jsx";

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
        {/* recruit */}
        <Route path="recruit/apply" element={<Apply2 />} />
        <Route path="recruit/apply/preview" element={<Apply2Review />} />
      </Route>

      {/* Admin Layout: /admin/* 는 전부 여기로 */}
      <Route path="admin" element={<LayoutAdmin />}>
        {/* 테스트용 기본 화면 */}
        <Route path="preview" element={<div>ADMIN PREVIEW</div>} />
        {/* 실제 Admin pages */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>
    </Routes>
  );
}

export default App;
