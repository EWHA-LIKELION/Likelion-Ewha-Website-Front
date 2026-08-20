import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useIsMobile } from "@/hooks";

/* =========================
    Segment Bar

    size(l | s)와 tone(dark | light)을 자유롭게 조합한다.

    사용 예시)
    <SegmentBar items={items} size="l" tone="dark" />
    <SegmentBar items={items} size="s" tone="light" />
========================= */

/* ===== size: 여백 / 타이포 ===== */
const SIZES = {
  l: {
    padding: "1rem 1.5rem",
    mobilePadding: "0.75rem 1.5rem",
    typography: "h5-regular",
    activeWeight: 700,
  },
  s: {
    padding: "0.72rem 1.5rem",
    mobilePadding: "0.5rem 0.88rem",
    typography: "body-regular",
    activeWeight: 800,
  },
};

/* ===== tone: 색상 ===== */
const TONES = {
  dark: {
    activeBg: "var(--neutral-20)",
    activeColor: "var(--common-100)",
    color: "var(--neutral-30)",
    border: "var(--neutral-90)",
  },
  light: {
    activeBg: "var(--neutral-40)",
    activeColor: "var(--common-100)",
    color: "var(--neutral-70)",
    border: "var(--neutral-95)",
  },
};

const SegmentBar = ({
  items = [],
  size = "l",
  tone = "dark",
  onSelect,
  style,
  className,
  selected,
  readOnly = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(selected ?? 0);
  const isMobile = useIsMobile();

  const sizeStyle = SIZES[size] ?? SIZES.l;
  const toneStyle = TONES[tone] ?? TONES.dark;

  useEffect(() => {
    if (selected !== undefined && selected !== activeIndex) {
      setActiveIndex(selected);
    }
  }, [selected]);

  const handleClick = (index) => {
    if (readOnly) return;
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index, items[index]);
    }
  };

  return (
    <Wrapper className={className} style={style}>
      {items.map((item, index) => (
        <Button
          key={index}
          $active={activeIndex === index}
          $size={sizeStyle}
          $tone={toneStyle}
          $readOnly={readOnly}
          onClick={() => handleClick(index)}
          className={isMobile ? "body-regular" : sizeStyle.typography}
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
  padding: ${({ $size }) => $size.padding};

  @media (max-width: 799px) {
    padding: ${({ $size }) => $size.mobilePadding};
  }

  /* font-weight 미리 렌더링해서 클릭했을 때 width 변화 없도록 */
  &::before {
    content: attr(data-text);
    font-weight: ${({ $size }) => $size.activeWeight};
    visibility: hidden;
    height: 0;
    display: block;
    overflow: hidden;
  }

  background: ${({ $readOnly, $active, $tone }) => {
    if ($readOnly) return "var(--common-100)";
    return $active ? $tone.activeBg : "var(--common-100)";
  }};

  color: ${({ $readOnly, $active, $tone }) => {
    if ($readOnly) {
      return $active ? "var(--neutral-20)" : "var(--neutral-70)";
    }
    return $active ? $tone.activeColor : $tone.color;
  }};

  font-weight: ${({ $active, $size }) =>
    $active ? $size.activeWeight : "inherit"};

  border: 1px solid
    ${({ $readOnly, $active, $tone }) => {
      if ($readOnly) return "var(--neutral-95)";
      return $active ? $tone.activeBg : $tone.border;
    }};

  border-right: none;

  &:last-child {
    border-right: 1px solid
      ${({ $active, $tone }) => ($active ? $tone.activeBg : $tone.border)};
  }

  cursor: ${({ $readOnly }) => ($readOnly ? "default" : "pointer")};

  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    filter: ${({ $readOnly }) => ($readOnly ? "none" : "brightness(0.9)")};
  }
`;
