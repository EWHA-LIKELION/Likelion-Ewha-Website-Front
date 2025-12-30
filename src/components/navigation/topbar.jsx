import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

/**
 * TopBar 코드 요약
 * - PC: 로고 + 메뉴 3개 표시
 * - MO: 로고 + 햄버거 표시
 * - 햄버거 클릭 시 App에게 "모바일 패널 열림/닫힘" 상태를 전달
 *
 * 주의:
 * - 오른쪽 패널(햄버거 클릭 시 뜨는 리스트) 자체는 App.jsx의 2컬럼 레이아웃에서 렌더링
 */
const TopBar = ({ onToggleMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 햄버거 토글
  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggleMobileMenu?.(next); // App에 상태 전달
      return next;
    });
  };

  return (
    <Topbar>
      <Inner>
        <Logo to="/" aria-label="LIKELION EWHA Home">
          <img src="/icons/logotop.svg" alt="LIKELION EWHA" />
        </Logo>

        {/* PC버전 메뉴 */}
        <PcNav aria-label="Primary">
          <MenuLink to="/project">PROJECT</MenuLink>
          <MenuLink to="/people">PEOPLE</MenuLink>
          <MenuLink to="/recruit">RECRUIT</MenuLink>
        </PcNav>

        {/* MO버전 햄버거 */}
        <MoMenuButton type="button" aria-label="Open menu" onClick={toggleMenu}>
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

  /* PC에서의 active는 NavLink 기본 .active로 처리함 */
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
