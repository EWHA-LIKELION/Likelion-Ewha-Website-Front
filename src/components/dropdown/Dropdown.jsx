import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";

const Dropdown = ({
  options = [],
  defaultValue,
  placeholder = "선택하세요",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [textWidth, setTextWidth] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);

  const dropdownRef = useRef(null);
  const hiddenOptionsRef = useRef(null); // 텍스트 너비 측정용

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 옵션 중 가장 긴 텍스트 기준으로 width 계산
  useLayoutEffect(() => {
    if (hiddenOptionsRef.current) {
      const items = hiddenOptionsRef.current.children;
      let maxWidth = 0;

      for (let i = 0; i < items.length; i++) {
        const itemWidth = items[i].offsetWidth;
        if (itemWidth > maxWidth) {
          maxWidth = itemWidth;
        }
      }

      setTextWidth(maxWidth);
    }
  }, [options, isMobile]);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <Container ref={dropdownRef}>
      <SelectButton className={isMobile ? "body-regular" : "h5-regular"}>
        <TextWrapper>
          <SelectedText
            style={{
              width: textWidth ? `${textWidth}px` : "auto",
            }}
          >
            {selectedValue || placeholder}
          </SelectedText>
        </TextWrapper>

        <OptionsList
          $isOpen={isOpen}
          style={{
            width: textWidth ? `${textWidth}px` : "auto",
          }}
        >
          {options.map((option, index) => (
            <OptionItem
              key={index}
              onClick={() => handleSelect(option)}
              $isSelected={selectedValue === option}
              className={isMobile ? "body-regular" : "h5-regular"}
            >
              {option}
            </OptionItem>
          ))}
        </OptionsList>

        <ArrowButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
          <ChevronDown stroke="white" />
        </ArrowButton>
      </SelectButton>

      {/* 🔹 텍스트 너비 측정 전용 (화면에 안 보임) */}
      <HiddenOptionsList ref={hiddenOptionsRef}>
        {options.map((option, index) => (
          <OptionItem
            key={index}
            className={isMobile ? "body-regular" : "h5-regular"}
          >
            {option}
          </OptionItem>
        ))}
      </HiddenOptionsList>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  position: relative;
  display: inline-flex;
`;

const SelectButton = styled.button`
  padding: 0;
  display: inline-flex;
  align-items: stretch;
  background: var(--common-100);
  border: none;
  cursor: default;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const SelectedText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 1.5rem;
  white-space: nowrap;
  color: var(--neutral-20);
  border: 1px solid var(--neutral-90);

  @media (max-width: 799px) {
    padding: 0.5rem 1rem;
  }
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.2rem;
  background: var(--neutral-20);
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    transform: ${(props) =>
      props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.2s ease;
  }

  &:hover {
    filter: brightness(0.97);
  }

  @media (max-width: 799px) {
    padding: 0.68rem 0.5rem;
    svg {
      width: 0.875rem;
      height: 0.4375rem;
    }
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;

  max-height: 24.7rem;
  overflow-y: auto;

  background: var(--common-100);
  border-left: 1px solid var(--neutral-90);
  border-right: 1px solid var(--neutral-90);
  border-bottom: 1px solid var(--neutral-90);

  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;

  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  @media (max-width: 799px) {
    max-height: 16.9rem;
  }
`;

const OptionItem = styled.li`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  background: var(--static-white);
  color: var(--neutral-30);

  &:hover {
    filter: brightness(0.97);
  }

  ${(props) =>
    props.$isSelected &&
    `
    background: var(--cool-neutral-98);
  `}

  &:not(:last-child) {
    border-bottom: 1px solid var(--neutral-95);
  }

  @media (max-width: 799px) {
    padding: 0.5rem 1rem;
  }
`;

const HiddenOptionsList = styled.ul`
  position: absolute;
  visibility: hidden;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  width: max-content;
  white-space: nowrap;

  padding: 0;
  margin: 0;
  list-style: none;
`;
