import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Check from "@/assets/icons/check.svg?react";

// Count 배지(1.25rem) + gap(0.5rem)
const COUNT_WIDTH = 28;
// 측정 대상인 OptionItem에는 없고 SelectedText에만 있는 좌우 보더
const BORDER_WIDTH = 2;

const AdminDropdown = ({
  options = [],
  defaultValues = [],
  placeholder = "선택하세요",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(defaultValues);
  const [textWidth, setTextWidth] = useState(null);

  const dropdownRef = useRef(null);
  const hiddenOptionsRef = useRef(null); // 텍스트 너비 측정용
  const hiddenPlaceholderRef = useRef(null);

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

  // 가장 긴 옵션과 placeholder(+카운트 배지) 중 더 넓은 쪽 기준으로 width 계산
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

      // 버튼에는 placeholder가 항상 남고, 선택이 있으면 그 옆에 배지가 붙는다
      const placeholderWidth = hiddenPlaceholderRef.current?.offsetWidth ?? 0;
      const contentWidth = Math.max(maxWidth, placeholderWidth + COUNT_WIDTH);

      setTextWidth(contentWidth + BORDER_WIDTH);
    }
  }, [options, placeholder]);

  // 다중 선택: 이미 선택된 항목이면 해제, 아니면 추가 (목록은 열린 채로 유지)
  const handleSelect = (option) => {
    const next = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    // 클릭 순서와 무관하게 options 순서를 따라가도록 정렬
    const ordered = options.filter((value) => next.includes(value));

    setSelectedValues(ordered);
    if (onChange) onChange(ordered);
  };

  return (
    <Container ref={dropdownRef}>
      <SelectButton className="h5-regular">
        <TextWrapper>
          <SelectedText
            style={{
              width: textWidth ? `${textWidth}px` : "auto",
            }}
          >
            {placeholder}
            {selectedValues.length > 0 && (
              <Count>{selectedValues.length}</Count>
            )}
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
              $isSelected={selectedValues.includes(option)}
              className="h5-regular"
            >
              <CheckBox $isSelected={selectedValues.includes(option)}>
                {selectedValues.includes(option) && <Check />}
              </CheckBox>
              {option}
            </OptionItem>
          ))}
        </OptionsList>

        <ArrowButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
          <ChevronDown stroke="white" />
        </ArrowButton>
      </SelectButton>

      {/* 텍스트 너비 측정 전용 (화면에 안 보임) */}
      <HiddenOptionsList ref={hiddenOptionsRef}>
        {options.map((option, index) => (
          <OptionItem key={index} className="h5-regular">
            <CheckBox />
            {option}
          </OptionItem>
        ))}
      </HiddenOptionsList>
      <HiddenOptionsList ref={hiddenPlaceholderRef}>
        <OptionItem className="h5-regular">{placeholder}</OptionItem>
      </HiddenOptionsList>
    </Container>
  );
};

export default AdminDropdown;

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
  flex-direction: row;
  gap: 0.5rem;

  padding: 1rem 1.5rem;
  white-space: nowrap;
  color: var(--neutral-20);
  border: 1px solid var(--neutral-90);
`;

const Count = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--primary-main);
  border-radius: 0.33331rem;

  color: var(--static-white);
  font-size: 0.875rem;
  font-weight: 700;
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
`;

const OptionItem = styled.li`
  padding: 1rem 1rem 1rem 0.72rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;

  cursor: pointer;
  background: var(--static-white);
  color: var(--neutral-30);

  &:hover {
    filter: brightness(0.97);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--neutral-95);
  }
`;

const CheckBox = styled.div`
  height: 0.9375rem;
  width: 0.9375rem;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--interaction-disabled);
  border-radius: 0.25rem;

  ${(props) =>
    props.$isSelected &&
    `
    background: var(--primary-sub);
    border-color: var(--primary-sub);
  `}
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
