import { useState } from "react";
import styled from "styled-components";
import TopBar from "./components/topbar";
import BottomBar from "./components/bottombar";
import { NavLink } from "react-router-dom";

/**
 * 코드 요약
 * - TopBar는 상단 고정
 * - TopBar 하단: "왼쪽 main + 오른쪽(모바일) 패널" 2컬럼 구조
 * - main이 길어져서 스크롤 발생 시, footer 위까지 늘어남
 */

function App() {
  // 모바일 햄버거 패널 열림/닫힘 상태
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

      {/*TopBar 아래 영역: main + (모바일 전용) 오른쪽 패널*/}
      <ContentRow>
        <MainArea>
          <h1 style={{ marginBottom: 16 }}>Main Content</h1>
          {Array.from({ length: 60 }).map((_, i) => (
            <Card key={i}>카드 {i + 1}</Card>
          ))}
        </MainArea>

        {/*모바일 전용 패널*/}
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
}

export default App;


const Shell = styled.div`
  /* 페이지 전체 세로 정렬 기본 레이아웃 */
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled.div`
  /* TopBar 아래를 2컬럼(왼쪽 main + 오른쪽 패널) 구성 */
  flex: 1;
  display: flex;
  align-items: stretch;
`;

const MainArea = styled.main`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

const Card = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

/**
 * 모바일 패널
 * - PC(>=800px)에서는 숨김
 * - MO(<=799px)에서만 보여줄 수 있음
 * - open=false면 display:none 처리
 */

const MoPanel = styled.aside`
  display: none;

  @media (max-width: 799px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};

    /*패널 오른쪽 컬럼*/
    width: 200px;
    min-width: 152px;
    max-width: 391px;

    /*높이: main과 동일*/
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
  color: ${({ $active }) => ($active ? "#00FF67" : "#FFF")};
  text-align: center;
  font-family: "Bayon", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  text-decoration: none;
`;
