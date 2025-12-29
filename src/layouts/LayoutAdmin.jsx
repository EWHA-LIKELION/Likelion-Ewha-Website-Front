import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/sidebar.jsx";

const LayoutAdmin = () => {
  return (
    <Shell>
      <ContentRow>
        <DesktopSidebar>
          <Sidebar />
        </DesktopSidebar>

        <MainArea>
          <Outlet />
        </MainArea>
      </ContentRow>
    </Shell>
  );
};

export default LayoutAdmin;

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
