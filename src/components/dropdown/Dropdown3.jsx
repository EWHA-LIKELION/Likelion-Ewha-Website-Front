import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DropDown3 = ({ question, answer, styleType = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 799);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <Container $isOpen={isOpen} $styleType={styleType}>
      <SelectButton 
        $isOpen={isOpen}
        $styleType={styleType}
        onClick={() => setIsOpen(!isOpen)}
      >
        <TextWrapper>
          <QuestionText 
            className={
              isMobile 
                ? (styleType === 1 ? "body-bold" : "footnote-bold") 
                : (styleType === 1 ? "h4-bold" : "body-bold")
            } 
            $styleType={styleType}
          >
            {question}
          </QuestionText>
        </TextWrapper>
        <ArrowButton $isOpen={isOpen} $styleType={styleType}>
          {styleType === 1 ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="14" viewBox="0 0 25 14" fill="none">
              <path d="M0.707031 0.707031L12.3737 12.3737L24.0404 0.707027" stroke={isOpen ? 'var(--primary-main)' : 'var(--neutral-70)'} strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M0.707031 0.707031L8.8737 8.8737L17.0404 0.707031" stroke="#9B9B9B" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          )}
        </ArrowButton>
      </SelectButton>
      
      <AnswerContent 
        $isOpen={isOpen}
        className={
          isMobile 
            ? ("footnote-regular") 
            : (styleType === 1 ? "h5-regular" : "footnote-regular")
        } 
        $styleType={styleType}
      >
        {answer}
      </AnswerContent>
    </Container>
  );
};

export default DropDown3;

const Container = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) => {
    if (props.$styleType === 1) {
      return props.$isOpen ? 'var(--green-99)' : 'var(--common-100)';
    }
    return 'var(--cool-neutral-99)';
  }};
  border: 1px solid ${(props) => {
    if (props.$styleType === 1) {
      return props.$isOpen ? 'var(--primary-main)' : 'var(--neutral-95)';
    }
    return 'var(--neutral-95)';
  }};
  border-radius: ${(props) => (props.$styleType === 1 ? '1rem' : '0.5rem')};
  overflow: hidden;
  transition: all 0.2s ease, border-radius 0.2s ease;

  @media (max-width: 799px) {
    border-radius: ${(props) => (props.$styleType === 1 ? '0.75rem' : '0.2rem')};
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: ${(props) => (props.$styleType === 1 ? '2rem 2.5rem' : '0.75rem 1.75rem')};
  padding-bottom: ${(props) => {
    if (props.$styleType === 2) return '0.75rem';
    return props.$isOpen ? '1.12rem' : '2rem';
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background: transparent;
  border:none;
  cursor: pointer;
  transition: padding 0.2s ease;

  @media (max-width: 799px) {
    padding: ${(props) => (props.$styleType === 1 ? '1rem 1.25rem' : '0.5rem 0.88rem')};
  }
`;

const TextWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const QuestionText = styled.span`
  display: block;
  text-align: left;
  color: ${(props) => (props.$styleType === 1 ? 'var(--neutral-20)' : 'var(--neutral-50)')};
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    display: block;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`;

const AnswerContent = styled.div`
  padding: ${(props) => {
    if (!props.$isOpen) return '0';
    return props.$styleType === 1 ? '0 2.5rem 2rem 2.5rem' : '0 1.75rem 0.75rem 1.75rem';
  }};
  background: transparent;
  text-align: left;
  color: var(--neutral-50);
  white-space: pre-line;
  transition: padding 0.2s ease, max-height 0.3s ease, opacity 0.2s ease;
  max-height: ${(props) => (props.$isOpen ? '1000px' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  overflow: hidden;

  @media (max-width: 799px) {
    padding: ${(props) => {
      if (!props.$isOpen) return '0';
      return props.$styleType === 1 ? '0 1.25rem 1rem 1.25rem' : '0 0.88rem 0.5rem 0.88rem';
    }};
  }
`;
