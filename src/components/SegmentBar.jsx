import React, { useState } from "react";
import styled from "styled-components";

const SegmentBar = ({ items = [], styleType = 1, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index, items[index]);
    }
  };

  return (
    <Wrapper $styleType={styleType}>
      {items.map((item, index) => (
        <Button
          key={index}
          $active={activeIndex === index}
          $styleType={styleType}
          $count={items.length}
          onClick={() => handleClick(index)}
          className={styleType === 1 ? 'h5-regular' : 'body-regular'}
        >
          {item}
        </Button>
      ))}
    </Wrapper>
  );
};

export default SegmentBar;

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  background: var(--common-100);
  padding: 0;
  border: 1px solid var(--neutral-90);
`;

const Button = styled.button`
  padding: ${(props) => {
    if (props.$styleType === 1) {
      return "1rem 1.5rem";
    } else {
      return "0.72rem 1.5rem";
    }
  }};
  
  border: none;

  background: ${(props) => {
    if (props.$styleType === 1) {
      return props.$active ? "var(--neutral-20)" : "var(--common-100)";
    } else {
      return props.$active ? "var(--neutral-40)" : "var(--common-100)";
    }
  }};

  color: ${(props) => {
    if (props.$styleType === 1) {
      return props.$active ? "var(--common-100)" : "var(--neutral-30)";
    } else {
      return props.$active ? "var(--common-100)" : "var(--neutral-70)";
    }
  }};

  font-weight: ${(props) => {
    if (props.$styleType === 1) {
      return props.$active ? "700" : "inherit";
    } else {
      return props.$active ? "800" : "inherit";
    }
  }};

  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    filter: brightness(0.9);
  }

  border-right: 1px solid var(--neutral-90);
  &:last-child {
    border-right: none;
  }
`;