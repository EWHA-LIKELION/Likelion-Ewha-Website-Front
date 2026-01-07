import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "./pages/home/Home";
import Project from './pages/project/Project.jsx';
import ProjectDetail from './pages/project/project-detail/ProjectDetail.jsx';
import People from './pages/people/People.jsx';
import RecruitGuidePage from "./pages/RecruitGuidePage/RecruitGuidePage";
import Apply2 from "./pages/apply2.jsx"
import Apply1 from "./pages/apply1.jsx";

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

        {/* apply pages */}
        <Route path="recruit/apply/form1" element={<Apply1/>} />
        <Route path="recruit/apply/form2" element={<Apply2/>} />

        {/* Sidebar (Admin) pages */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>
    </Routes>
  );
}

export default App;
