import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Wrapper aria-label="Sidebar">
      <Content>
        <TopBlock>
          <Logo>
            <img src="/icons/logoside.svg" alt="LIKELION EWHA" />
          </Logo>

          <MenuGroup>
            <MenuItem to="applicant" end>
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icons/applyactive.svg"
                        : "/icons/applyunactive.svg"
                    }
                    alt=""
                  />
                  <MenuText $active={isActive}>지원자 관리</MenuText>
                </>
              )}
            </MenuItem>

            <MenuItem to="interview">
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icons/clockactive.svg"
                        : "/icons/clockunactive.svg"
                    }
                    alt=""
                  />
                  <MenuText $active={isActive}>면접 관리</MenuText>
                </>
              )}
            </MenuItem>

            <MenuItem to="application">
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icons/cvactive.svg"
                        : "/icons/cvunactive.svg"
                    }
                    alt=""
                  />
                  <MenuText $active={isActive}>지원서 관리</MenuText>
                </>
              )}
            </MenuItem>
          </MenuGroup>
        </TopBlock>

        <BottomBlock>
          <Divider />
          <LogoutRow type="button" onClick={handleLogout} aria-label="로그아웃">
            <img src="/icons/logout.svg" alt="" />
            <LogoutText>로그아웃</LogoutText>
          </LogoutRow>
        </BottomBlock>
      </Content>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.aside`
  display: inline-flex;
  height: 100dvh;
  padding: 40px 32px 80px 32px;
  flex-direction: column;
  align-items: center;
  background: var(--neutral-15, #1c1c1c);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  height: 100%;
  width: 100%;
`;

const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    display: block;
    width: auto;
    height: auto;
  }
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  align-self: stretch;
  text-decoration: none;

  img {
    display: block;
    width: auto;
    height: auto;
  }
`;

const MenuText = styled.span`
  color: ${({ $active }) =>
    $active ? "#00FF67" : "var(--neutral-95, #DCDCDC)"};
  font-family: Cafe24 PRO Slim, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const BottomBlock = styled.div`
  display: flex;
  height: 55px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  margin-top: auto;
`;

const Divider = styled.div`
  width: 179px;
  height: 1px;
  flex-shrink: 0;
  background: var(--neutral-40, #5c5c5c);
`;

const LogoutRow = styled.button`
  display: flex;
  padding: 0 80px 0 1.989px;
  align-items: center;
  gap: 16.137px;
  align-self: stretch;

  background: transparent;
  border: 0;
  cursor: pointer;
`;

const LogoutText = styled.span`
  color: var(--neutral-70, #9b9b9b);
  font-family: Cafe24 PRO Slim, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;
