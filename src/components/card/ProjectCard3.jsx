import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ProjectCard3 = ({ 
  project="프로젝트명",
  description="프로젝트 설명",
  notice="",
  imageSrc = DEFAULT_IMAGE, 
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CardWrapper>
      <CardImage 
        src={imageSrc} 
        alt="project image"
        onError={(e) => {
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      <CardText>
        <Project className={isMobile ? "point-kor-h4":"point-kor-h2"}>{project}</Project>
        <Description className="body-regular">{description}</Description>
        {notice && <Notice className="footnote-regular">*{notice}</Notice>}
      </CardText>
    </CardWrapper>
  );
};

export default ProjectCard3;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60.625rem;
  max-height: 13.875rem;
  overflow: hidden;

  background: var(--static-white);
  border-radius: 1.25rem;
  border: 1px solid var(--neutral-95);

  transition: all 0.2s ease;

  @media (max-width: 1233px) {
    flex-direction: column;
    align-items: start;
    min-width: 40rem;
    max-height: none;
    height: auto;
  }

  @media (max-width: 799px) {
    min-width: 18rem;
    border-radius: 0.75rem;
  }
`;

const CardImage = styled.img`
  width: 42%;
  align-self: stretch;
  object-fit: cover;
  object-position: center;
  flex-shrink: 1;

  transition: all 0.2s ease;
 
  @media (max-width: 1233px) {
    width: 100%;
    height: 13.875rem;
    align-self: auto;
  }

  @media (max-width: 799px) {
    height: 11.25rem;
  }
`;

const CardText = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  gap: 0.75rem;

  flex-shrink: 0;
  padding: 1.25rem 1.75rem;

  text-align: left;

  transition: all 0.2s ease;
  
  @media (max-width: 1233px) {
    flex-shrink: 1;
    padding: 1.25rem 1.75rem;
    gap: 0.75rem;
  }

  @media (max-width: 799px) {
    padding: 0.87rem;
    gap: 0.5rem;
  }
`;

const Project = styled.div`
  color: var(--red-orange-60, #FF7B2E);
  font-family: "Cafe24 PRO Slim", sans-serif;
`;

const Description = styled.div`
  width: 100%;
  color: var(--neutral-20);
`;

const Notice = styled.span`
  color: var(--neutral-70);
  font-family: 'Pretendard', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
`;
