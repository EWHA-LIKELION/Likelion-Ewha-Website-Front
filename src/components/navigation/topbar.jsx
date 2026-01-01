import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

/*
  코드 요약:
  - MO 패널은 absolute overlay로 변경(본문 미이동 + TopBar와 함께 스크롤)
*/

const TopBar = ({ onToggleMobileMenu }) => {
  const headerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [headerH, setHeaderH] = useState(0);
  const [footerTopAbs, setFooterTopAbs] = useState(null);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggleMobileMenu?.(next);
      return next;
    });
  };

  useLayoutEffect(() => {
    const updateHeader = () => {
      if (!headerRef.current) return;
      setHeaderH(headerRef.current.offsetHeight);
    };

    updateHeader();
    window.addEventListener("resize", updateHeader);
    return () => window.removeEventListener("resize", updateHeader);
  }, []);

  useEffect(() => {
    const updateFooterTop = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setFooterTopAbs(null);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      setFooterTopAbs(absTop);
    };

    updateFooterTop();
    window.addEventListener("scroll", updateFooterTop, { passive: true });
    window.addEventListener("resize", updateFooterTop);
    return () => {
      window.removeEventListener("scroll", updateFooterTop);
      window.removeEventListener("resize", updateFooterTop);
    };
  }, []);

  return (
    <HeaderWrap ref={headerRef}>
      <Topbar>
        <Inner>
          <Logo to="/" aria-label="LIKELION EWHA Home">
            <img src="/icons/logotop.svg" alt="LIKELION EWHA" />
          </Logo>

          <PcNav aria-label="Primary">
            <MenuLink to="/project">PROJECT</MenuLink>
            <MenuLink to="/people">PEOPLE</MenuLink>
            <MenuLink to="/recruit">RECRUIT</MenuLink>
          </PcNav>

          <MoMenuButton
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <img src="/icons/hamburger.svg" alt="" />
          </MoMenuButton>
        </Inner>
      </Topbar>

      <MoOverlay
        $open={isOpen}
        $top={headerH}
        $footerTopAbs={footerTopAbs}
      >
        <MoBackdrop type="button" aria-label="Close menu" onClick={toggleMenu} />

        <MoPanel aria-label="Mobile menu">
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
      </MoOverlay>
    </HeaderWrap>
  );
};

export default TopBar;

const HeaderWrap = styled.div`
  position: relative;
  z-index: 1000;
`;

const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

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

const MoOverlay = styled.div`
  display: none;

  @media (max-width: 799px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: absolute;
    left: 0;
    right: 0;
    top: ${({ $top }) => `${$top}px`};
    ${({ $footerTopAbs }) =>
      $footerTopAbs != null
        ? `bottom: calc(100% - ${$footerTopAbs}px);`
        : `bottom: 0;`}

    z-index: 999;
  }
`;

const MoBackdrop = styled.button`
  position: absolute;
  inset: 0;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

const MoPanel = styled.aside`
  position: absolute;
  top: 0;
  right: 0;

  width: 200px;
  min-width: 152px;
  max-width: 391px;
  height: 100%;

  padding: 40px 28px;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  background: var(--neutral-15, #1c1c1c);
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
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;
`;
