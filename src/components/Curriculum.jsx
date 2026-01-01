import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { curriculums } from "@/data";

const Curriculum = ({ part = "pm" }) => {
  let curriculum;
  if (part === "fe") curriculum = curriculums.feCurriculum;
  else if (part === "be") curriculum = curriculums.beCurriculum;
  else curriculum = curriculums.pmCurriculum;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);
    
  useEffect(() => {
    const handleResize = () => {
    setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { title, subTitle, description, color1, color2, sessions } = curriculum;
  return (
    <Grid>
      <PartCard $color1={color1}>
        <Title className={isMobile ? "h5-bold" : "h3-extrabold"}>{title}</Title>
        <SubTitle className={isMobile ? "footnote-regular" : "h5-regular"}>{subTitle}</SubTitle>
        <Description className={isMobile ? "footnote-regular" : "h5-medium"}>{description}</Description>
      </PartCard>
      <CurriculumList>
        {sessions.map(({ sesstioinNum, sessionTitle }, idx) => (
          <SessionList key={idx}>
            <SessionNum $color2={color2} className="footnote-extrabold">{sesstioinNum}</SessionNum>
            <SessionTitle className={isMobile ? "footnote-regular" : "h5-regular"}>{sessionTitle}</SessionTitle>
          </SessionList>
        ))}
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
  color: var(--neutral-50);
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

const SessionList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  gap: 0.75rem;
  white-space: nowrap;
  
  border-radius: 0.40731rem;
  border: 1px solid var(--neutral-95);

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 0.5rem 0.62rem;
    gap: 0.5rem;

    border-radius: 0.25rem;
  }
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