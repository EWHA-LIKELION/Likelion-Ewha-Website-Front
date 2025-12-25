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
    <>
    </>
  )
}

export default App
