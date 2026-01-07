import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { curriculums } from "@/data";

const Curriculum = ({ part = "pm" }) => {
  let curriculum;
  if (part === "fe") curriculum = curriculums.feCurriculum;
  else if (part === "be") curriculum = curriculums.beCurriculum;
  else curriculum = curriculums.pmCurriculum;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);
  const [openIndexes, setOpenIndexes] = useState([]);
    
  useEffect(() => {
    const handleResize = () => {
    setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpenIndexes([]);
  }, [part]);

  const toggleSession = (index) => {
    setOpenIndexes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const { title, subTitle, description, color1, color2, sessions } = curriculum;
  
  return (
    <Grid>
      <PartCard $color1={color1}>
        <Title className={isMobile ? "h5-bold" : "h3-extrabold"}>{title}</Title>
        <SubTitle className={isMobile ? "footnote-regular" : "h5-regular"}>{subTitle}</SubTitle>
        <Description className={isMobile ? "footnote-regular" : "h5-medium"}>{description}</Description>
      </PartCard>
      <CurriculumList>
        {sessions.map(({ sesstioinNum, sessionTitle, "sessionDescription:": sessionDescription }, idx) => {
          const isOpen = openIndexes.includes(idx);
          
          return isMobile ? (
            <SessionList key={idx}>
              <SessionNum $color2={color2} className="footnote-extrabold">{sesstioinNum}</SessionNum>
              <SessionTitle className="footnote-regular">{sessionTitle}</SessionTitle>
            </SessionList>
          ) : (
            <DropdownSession key={idx} $isOpen={isOpen}>
              <DropdownButton $isOpen={isOpen} onClick={() => toggleSession(idx)}>
                <SessionContent>
                  <SessionNum $color2={color2} className="footnote-extrabold">{sesstioinNum}</SessionNum>
                  <SessionTitle className="h5-regular">{sessionTitle}</SessionTitle>
                </SessionContent>
                <ArrowButton $isOpen={isOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M0.707031 0.707031L8.8737 8.8737L17.0404 0.707031" stroke="#9B9B9B" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </ArrowButton>
              </DropdownButton>
              <DescriptionContent $isOpen={isOpen} className="footnote-regular">
                {sessionDescription}
              </DescriptionContent>
            </DropdownSession>
          );
        })}
      </CurriculumList>
    </Grid>
  );
}

export default Curriculum;


const Grid = styled.div`
  max-width: 50rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: start;
`;

const PartCard = styled.div`
  background: ${({ $color1 }) => $color1};
  display: flex;
  padding: 1.75rem 2rem;
  flex-direction: column;
  align-items: start;

  border-radius: 0.75rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 1.25rem;
    border-radius: 0.5rem;
  }
`;

const Title = styled.div`
  color: var(--neutral-20);
  margin-bottom: 0.25rem;

  white-space: nowrap;

  transition: all 0.2s ease;
`;

const SubTitle = styled.div`
  color: var(--neutral-20);
  margin-bottom: 5rem;

  transition: all 0.2s ease;
`;

const Description = styled.div`
  color: var(--neutral-20);

  transition: all 0.2s ease;
`;

const CurriculumList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    gap: 0.25rem;
  }
`;

const SessionList = styled.div` /* 모바일 gui에서만 사용 */
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.62rem;
  gap: 0.5rem;
  white-space: nowrap;
  
  border-radius: 0.25rem;
  border: 1px solid var(--neutral-95);
`;

const SessionNum = styled.div`
  display: flex;
  width: 2.25188rem;
  height: 1.66rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  background: ${({ $color2 }) => $color2};
  color: var(--static-white);
  border-radius: 0.40731rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    width: 1.75rem;
    height: 1.125rem;

    border-radius: 0.25rem;

    font-size: 0.625rem;
    font-weight: 700;
  }
`;

const SessionTitle = styled.div`
  color: var(--neutral-30);

  transition: all 0.2s ease;
`;

const DropdownSession = styled.div`
  width: 100%;
  background: var(--common-100);
  border: 1px solid var(--neutral-95);
  border-radius: 0.40731rem;
  overflow: hidden;
  transition: all 0.2s ease;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.25rem;
  padding-bottom: ${(props) => (props.$isOpen ? '0.5rem' : '0.75rem')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: padding 0.2s ease;
`;

const SessionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    display: block;
    transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`;

const DescriptionContent = styled.div`
  padding: ${(props) => (props.$isOpen ? '0 1.25rem 0.75rem 1.25rem' : '0')};
  color: var(--neutral-50);
  text-align: left;
  transition: padding 0.2s ease, max-height 0.2s ease, opacity 0.2s ease;
  max-height: ${(props) => (props.$isOpen ? '1000px' : '0')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  overflow: hidden;
`;