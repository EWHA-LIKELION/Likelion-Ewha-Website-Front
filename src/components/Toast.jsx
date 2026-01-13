import React, { createContext, useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 1. 내부 컴포넌트: 개별 토스트 메시지 (타이머 로직) 

const ToastItem = ({ id, message, onClose }) => {
  useEffect(() => {
    // 3초 후 자동 삭제
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <ToastBox>
      <span>{message}</span>
      <CloseButton onClick={() => onClose(id)} aria-label="Close">
        &times;
      </CloseButton>
    </ToastBox>
  );
};

// 2. Context & Provider (전역 상태 관리)
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now() + Math.random(); // 고유 ID 생성
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastListContainer>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            onClose={removeToast}
          />
        ))}
      </ToastListContainer>
    </ToastContext.Provider>
  );
};

// 3. Hook (외부에서 사용할 함수)
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// 스타일 정의 (Styled-components)

// 애니메이션: 오른쪽에서 스르륵 나타나기
const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// 토스트들이 쌓일 전체 영역 (화면 우측 상단 고정)
const ToastListContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 개별 토스트 박스
const ToastBox = styled.div`
  /* Layout */
  display: flex;
  width: 21.25rem; /* 340px */
  padding: 1rem 0.875rem 1rem 1.75rem;
  justify-content: space-between;
  align-items: center;

  /* Style & Colors */
  background: #d6fddb; /* --Atomic-Green-95 */
  border-left: 4px solid #05da5b; /* --Primary-Main */
  border-radius: 0.25rem; /* var(--unit-4) */
  box-shadow: 0 8px 16px 0 rgba(24, 24, 27, 0.1);

  /* Font & Text (색상은 이미지와 어울리는 짙은 녹색 계열 추천) */
  color: #155724;
  font-weight: 600;
  font-size: 0.95rem;

  /* Animation */
  animation: ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: auto;
  cursor: default;
`;

// 닫기 버튼 (X 아이콘)
const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #78a57e;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0 0 0 12px;
  transition: color 0.2s;

  &:hover {
    color: #155724;
  }
`;
