import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ProjectCard2 = ({ 
  project="프로젝트명",
  description="프로젝트 설명",
  tags=[],
  imageSrc = DEFAULT_IMAGE
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
        <Project className="h4-bold">{project}</Project>
        {!isMobile && (
          <Description className="body-regular">{description}</Description>
        )}
        <TagWrapper>
          {tags.map((tag, index) => (
            <Tag key={index} className="footnote-regular">#{tag}</Tag>
          ))}
        </TagWrapper>
      </CardText>
    </CardWrapper>
  );
};

export default ProjectCard2;

const CardWrapper = styled.div`
  display: flex;
  width: 19.375rem;
  height: 22.125rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  gap: 1rem;

  background: var(--static-white);
  border-radius: 1.25rem;
  border: 1px solid var(--neutral-95);

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    width: 9.9875rem;
    height: 11.332rem;
    gap: 0.5rem;
    border-radius: 0.625rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    height: 6.40225rem;
  }
`;

const CardText = styled.div`
  width: 100%;
  padding: 0 1.25rem 1.38rem 1.25rem;
  text-align: left;
  
  display: flex;
  flex-direction: column;
  flex: 1;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 0 0.57rem 0.66rem 0.57rem;
  }
`;

const Project = styled.div`
  color: var(--neutral-20);
  font-family: "Cafe24 PRO Slim", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const Description = styled.div`
  color: var(--neutral-50);
  margin-bottom: 1rem;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-top: 0.75rem;
  }
`;

const Tag = styled.span`
  color: var(--neutral-70);
  font-family: 'Pretendard', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
`;
