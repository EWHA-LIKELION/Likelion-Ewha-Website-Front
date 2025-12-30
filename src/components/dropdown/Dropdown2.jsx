import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropDown2 = ({ options = [], defaultValue, placeholder = "선택하세요", onSelect, unit = "", error = false, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <Container ref={dropdownRef}>
      <SelectButton 
        $isOpen={isOpen}
        $error={error}
        $disabled={disabled}
        className="h5-regular"
      >
        <TextWrapper>
          <SelectedText>
            {selectedValue ? `${selectedValue}${unit}` : placeholder}
          </SelectedText>
        </TextWrapper>
        <ArrowButton onClick={() => !disabled && setIsOpen(!isOpen)} $isOpen={isOpen} $disabled={disabled}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
            <path d="M0.530273 0.53125L7.53027 7.53125L14.5303 0.53125" stroke="#9B9B9B" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </ArrowButton>
      </SelectButton>
      
      {isOpen && (
        <OptionsList>
          {options.map((option, index) => (
            <OptionItem
              key={index}
              onClick={() => handleSelect(option)}
              $isSelected={selectedValue === option}
              className="h5-regular"
            >
              {option}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </Container>
  );
};

export default DropDown2;

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectButton = styled.button`
  padding: 0.5rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background: var(--common-100);
  border-radius: 0.25rem;
  border: 1px solid ${(props) => (props.$error ? 'var(--primary-sub)' : 'var(--neutral-95)')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'default')};
`;

const TextWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SelectedText = styled.span`
  width: 4.5rem;
  display: block;
  text-align: left;
  color: var(--neutral-30);
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  &:hover {
    filter: ${(props) => (props.$disabled ? 'none' : 'brightness(0.9)')};
  }

  svg {
    display: block;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  left: 0;
  right: 0;
  max-height: 17.25rem;
  overflow-y: auto;
  background: var(--common-100);
  border-radius: 0.25rem;
  border: 1px solid var(--neutral-95); 
  list-style: none;
  padding: 0;
  z-index: 1000;
`;

const OptionItem = styled.li`
  padding: 0.5rem;
  background: var(--common-100);
  color: var(--neutral-20);
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease;

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
`;
