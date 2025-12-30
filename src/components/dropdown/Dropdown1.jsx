import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropDown1 = ({ options = [], defaultValue, placeholder = "선택하세요", onSelect }) => {
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
        className="h5-regular"
      >
        <TextWrapper>
          <SelectedText>
            {selectedValue || placeholder}
          </SelectedText>
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
        </TextWrapper>
        <ArrowButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M0.707092 0.707031L8.87376 8.8737L17.0404 0.707031" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </ArrowButton>
      </SelectButton>
    </Container>
  );
};

export default DropDown1;

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  background: var(--common-100);
  border: none;
  cursor: default;
`;

const TextWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SelectedText = styled.span`
  display: block;
  padding: 1rem 1.5rem;
  text-align: left;
  color: var(--neutral-20);
  border: 1px solid var(--neutral-90);
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.2rem;
  background: var(--neutral-20);

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }

  svg {
    display: block;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  max-height: 17.25rem;
  overflow-y: auto;
  background: var(--common-100);
  border-left: 1px solid var(--neutral-90);
  border-right: 1px solid var(--neutral-90);
  border-bottom: 1px solid var(--neutral-90);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
`;

const OptionItem = styled.li`
  padding: 1rem 1.5rem;
  background: var(--common-100);
  color: var(--neutral-30);
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
