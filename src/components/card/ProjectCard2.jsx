import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ProjectCard2 = ({ 
  project="프로젝트명",
  description="프로젝트 설명",
  notice="",
  imageSrc = DEFAULT_IMAGE, 
}) => {
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
        <Project className="point-kor-h3">{project}</Project>
        <Description className="body-regular">{description}</Description>
        {notice && <Notice className="caption-regular">*{notice}</Notice>}
      </CardText>
    </CardWrapper>
  );
};

export default ProjectCard2;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 60.625rem;
  overflow: hidden;

  background: var(--static-white);
  border-radius: 1.25rem;
  border: 1px solid var(--neutral-95);

  @media (max-width: 1032px) {
    flex-direction: column;
    min-width: 40rem;
    height: auto;
  }
`;

const CardImage = styled.img`
  width: 42%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 1;
 
  @media (max-width: 1032px) {
    width: 100%;
    height: 13.875rem;
  }
`;

const CardText = styled.div`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  padding: 1.94rem 1.75rem;

  text-align: left;
  
  @media (max-width: 1032px) {
    flex-shrink: 1;
  }
`;

const Project = styled.div`
  color: var(--red-orange-60, #FF7B2E);
  font-family: "Cafe24 PRO Slim", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  width: 100%;
  color: var(--neutral-20);
  margin-top: 0.75rem;
`;

const Notice = styled.span`
  color: var(--neutral-70);
  font-family: 'Pretendard', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;

  margin-top: 0.25rem;
`;
