import { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TopBar from "../components/navigation/topbar.jsx";
import BottomBar from "../components/navigation/bottombar.jsx";

const Layout = () => {
  const [moMenuOpen, setMoMenuOpen] = useState(false);

  return (
    <Shell>
      <TopBar onToggleMobileMenu={setMoMenuOpen} />

      <MainArea>
        <Outlet />
      </MainArea>

      <BottomBar />
    </Shell>
  );
};

export default Layout;

const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const MainArea = styled.main`
  flex: 1;
  background: #fff;
  padding: 20px;
`;
