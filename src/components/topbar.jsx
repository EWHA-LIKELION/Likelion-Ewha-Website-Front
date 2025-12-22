import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TopBar = ({ onClickMenu }) => {
  return (
    <Topbar>
      <Inner>
        <Logo to="/" aria-label="LIKELION EWHA Home">
          <img src="/icons/logo_top.svg" alt="LIKELION EWHA" />
        </Logo>

        {/*PC*/}
        <PcNav aria-label="Primary">
          <MenuLink to="/project">PROJECT</MenuLink>
          <MenuLink to="/people">PEOPLE</MenuLink>
          <MenuLink to="/recruit">RECRUIT</MenuLink>
        </PcNav>

        {/*MO*/}
        <MoMenuButton
          type="button"
          aria-label="Open menu"
          onClick={onClickMenu}
        >
          <img src="/icons/hamburger.svg" alt="" />
        </MoMenuButton>
      </Inner>
    </Topbar>
  );
};

export default TopBar;


const Topbar = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--neutral-15, #1c1c1c);
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* PC: 800px 이상 */
  @media (min-width: 800px) {
    width: 1440px;
    min-width: 800px;
    padding: 20px 80px;
    gap: 10px;
  }

  /* MO: 320px ~ 799px */
  @media (max-width: 799px) {
    width: 393px;
    min-width: 320px;
    padding: 10px 20px;
  }
`;

const Logo = styled(NavLink)`
  display: inline-flex;
  align-items: center;

  img {
    display: block;
    width: auto;
    height: auto;
  }
`;

const PcNav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 799px) {
    display: none;
  }
`;

const MenuLink = styled(NavLink)`
  color: var(--static-white, #fff);
  text-align: center;
  font-family: "Bayon", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;

  &.active {
    color: var(--primary-main, #05da5b);
  }
`;

const MoMenuButton = styled.button`
  display: none;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;

  @media (max-width: 799px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  img {
    display: block;
    width: auto;
    height: auto;
  }
`;
