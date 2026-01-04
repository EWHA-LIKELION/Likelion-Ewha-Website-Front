import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home/Home";
import Project from './pages/project/Project.jsx';
import ProjectDetail from './pages/project/project-detail/ProjectDetail.jsx';
import People from './pages/people/People.jsx';
import RecruitGuidePage from "./pages/RecruitGuidePage/RecruitGuidePage";
import RecruitPart from "./pages/recruit/RecruitPart.jsx";
import Apply2 from "./pages/apply2.jsx";

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

        {/* Recruit pages */}
        <Route path="recruit">
          <Route index element={<RecruitGuidePage />} />
          <Route path="apply">
            <Route path="part" element={<RecruitPart />} />
            <Route path="form" element={<div> recruit-apply-form </div>} />
          </Route>
          <Route path="preview" element={<div> recruit-preview </div>} />
          <Route path="result" element={<div> recruit-result </div>} />
      </Route>

        {/* apply pages */}
        <Route path="apply/test" element={<Apply2/>} />

        {/* Sidebar (Admin) pages */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>
    </Routes>
  );
}

export default App;
