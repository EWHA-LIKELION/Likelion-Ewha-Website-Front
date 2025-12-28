import { useState } from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import TopBar from "../components/navigation/topbar.jsx";
import BottomBar from "../components/navigation/bottombar.jsx";
import Sidebar from "../components/navigation/sidebar.jsx";

const Layout = () => {
  const [moMenuOpen, setMoMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleMobileMenuClick = (nextKey) => {
    setSelected((prev) => {
      if (prev && prev !== nextKey) {
        setMoMenuOpen(false);
      }
      return nextKey;
    });
  };

  return (
    <Shell>
      <TopBar onToggleMobileMenu={setMoMenuOpen} />

      <ContentRow>
        <DesktopSidebar>{/*<Sidebar />}*/}</DesktopSidebar>

        <MainArea>
          <Outlet />
        </MainArea>

        <MoPanel $open={moMenuOpen} aria-label="Mobile side panel">
          <MoMenu aria-label="Mobile menu">
            <MoItem
              to="/project"
              $active={selected === "project"}
              onClick={() => handleMobileMenuClick("project")}
            >
              PROJECT
            </MoItem>

            <MoItem
              to="/people"
              $active={selected === "people"}
              onClick={() => handleMobileMenuClick("people")}
            >
              PEOPLE
            </MoItem>

            <MoItem
              to="/recruit"
              $active={selected === "recruit"}
              onClick={() => handleMobileMenuClick("recruit")}
            >
              RECRUIT
            </MoItem>
          </MoMenu>
        </MoPanel>
      </ContentRow>

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

const ContentRow = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  min-height: 0;
`;

const DesktopSidebar = styled.aside`
  display: none;

  @media (min-width: 800px) {
    display: flex;
    align-self: stretch;
  }
`;

const MainArea = styled.main`
  flex: 1;
  background: #fff;
  padding: 20px;
  min-width: 0;
`;

const MoPanel = styled.aside`
  display: none;
  z-index: 9999;

  @media (max-width: 799px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    width: 200px;
    min-width: 152px;
    max-width: 391px;
    padding: 40px 28px;
    background: var(--neutral-15, #1c1c1c);
  }
`;

const MoMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const MoItem = styled(NavLink)`
  color: ${({ $active }) => ($active ? "#00FF67" : "#fff")};
  text-align: center;
  font-family: "Bayon", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;
`;
