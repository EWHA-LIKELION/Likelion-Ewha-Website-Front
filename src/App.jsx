import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/hompage/Home";
import Project from './pages/project/Project.jsx';
import ProjectDetail from './pages/project/project-detail/ProjectDetail.jsx';
import People from './pages/people/People.jsx';
import RecruitGuidePage from './pages/RecruitGuidePage/RecruitGuidePage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Public pages */}
        <Route path="project" element={<Project />} />
        <Route path="project/detail" element={<ProjectDetail />} />
        <Route path="people" element={<People />} 
        <Route path="recruit" element={<RecruitGuidePage />} />

        {/* Sidebar (Admin) pages */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>
    </Routes>
  );
}

export default App;
