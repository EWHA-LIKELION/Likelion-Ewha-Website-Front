import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SegmentBar = ({ items = [], styleType = 1, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          className={
            isMobile 
              ? 'body-regular' 
              : (styleType === 1 ? 'h5-regular' : 'body-regular')
          }
          data-text={item}
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
`;

const Button = styled.button`
  position: relative;
  padding: ${(props) => {
    if (props.$styleType === 1) {
      return "1rem 1.5rem";
    } else {
      return "0.72rem 1.5rem";
    }
  }};

  @media (max-width:799px){
    padding: 0.75rem 1.5rem;
  }

  {/*font-weight 미리 렌더링해서 클릭했을때 width 변화 없도록*/}
  &::before {
    content: attr(data-text);
    font-weight: ${(props) => (props.$styleType === 1 ? "700" : "800")};
    visibility: hidden;
    height: 0;
    display: block;
    overflow: hidden;
  }

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
  white-space: nowrap;
  
  &:hover {
    filter: brightness(0.9);
  }

  border: 1px solid ${(props) => {
    if (props.$active) {
      if (props.$styleType === 1) {
        return " var(--neutral-20)";
      } else {
        return "var(--neutral-40)";
      }
    }

    if (props.$styleType === 1) {
      return "var(--neutral-90)";
    } else {
      return "var(--neutral-95)";
    }
  }};

  border-right: none;
  
  &:last-child {
    border-right: 1px solid ${(props) => {
    if (props.$active) {
      if (props.$styleType === 1) {
        return "var(--neutral-20)";
      } else {
        return "var(--neutral-40)";
      }
    }
    if (props.$styleType === 1) {
      return "var(--neutral-90)";
    } else {
      return "var(--neutral-95)";
    }
  }};
  }
`;