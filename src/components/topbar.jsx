import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useLayoutEffect, useRef, useState } from "react";

const TopBar = () => {
  const headerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [headerH, setHeaderH] = useState(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useLayoutEffect(() => {
    const update = () => {
      if (!headerRef.current) return;
      setHeaderH(headerRef.current.offsetHeight);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <Topbar ref={headerRef}>
        <Inner>
          <Logo to="/" aria-label="LIKELION EWHA Home">
            <img src="/icons/logo_top.svg" alt="LIKELION EWHA" />
          </Logo>

          {/* PC */}
          <PcNav aria-label="Primary">
            <MenuLink to="/project">PROJECT</MenuLink>
            <MenuLink to="/people">PEOPLE</MenuLink>
            <MenuLink to="/recruit">RECRUIT</MenuLink>
          </PcNav>

          {/* MO */}
          <MoMenuButton
            type="button"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <img src="/icons/hamburger.svg" alt="" />
          </MoMenuButton>
        </Inner>
      </Topbar>

      <MoPanelSlot $open={isOpen} aria-label="Mobile menu slot">
        <MoPanel $headerH={headerH} aria-label="Mobile menu">
          <MoMenu>
            <MoItem
              to="/project"
              $active={selected === "project"}
              onClick={() => setSelected("project")}
            >
              PROJECT
            </MoItem>
            <MoItem
              to="/people"
              $active={selected === "people"}
              onClick={() => setSelected("people")}
            >
              PEOPLE
            </MoItem>
            <MoItem
              to="/recruit"
              $active={selected === "recruit"}
              onClick={() => setSelected("recruit")}
            >
              RECRUIT
            </MoItem>
          </MoMenu>
        </MoPanel>
      </MoPanelSlot>
    </>
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

  /* MO: 좌우 20px 고정 */
  @media (max-width: 799px) {
    width: 100%;
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
  gap: 32px;

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

    width: 28px;
    height: 28px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
  }

  img {
    display: block;
    width: 28px;
    height: 28px;
  }
`;


const MoPanelSlot = styled.div`
  display: none;

  @media (max-width: 799px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    width: 100%;
  }
`;

const MoPanel = styled.aside`
  display: none;

  @media (max-width: 799px) {
    display: flex;

    width: 200px;
    min-width: 152px;
    max-width: 391px;
    min-height: 240px;
    height: calc(100dvh - ${({ $headerH }) => `${$headerH}px`});
    margin-left: auto;
    padding: 40px 28px;
    align-items: flex-start;
    gap: 10px;

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
  color: ${({ $active }) => ($active ? "#00FF67" : "#FFF")};
  text-align: center;
  font-family: "Bayon", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;
`;
