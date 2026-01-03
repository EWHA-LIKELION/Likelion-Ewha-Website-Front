import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Home from "../src/pages/hompage/Home.jsx";
import People from "../src/pages/people/People.jsx";
import Project from "../src/pages/project/Project.jsx";
import RecruitGuidePage from "../src/pages/RecruitGuidePage/RecruitGuidePage.jsx";
import Apply2 from "./pages/apply2.jsx";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* home */}
        <Route index element={<Home />} />

        {/* public */}
        <Route path="project" element={<Project />} />
        <Route path="people" element={<People />} />
        <Route path="recruit" element={<RecruitGuidePage />} />

        {/* recruit */}
        <Route path="recruit/apply/form" element={<Apply2 />} />

        {/* admin (임시) */}
        <Route path="applicant" element={<div>APPLICANT</div>} />
        <Route path="interview" element={<div>INTERVIEW</div>} />
        <Route path="application" element={<div>APPLICATION</div>} />
      </Route>
    </Routes>
  );
}

export default App;
