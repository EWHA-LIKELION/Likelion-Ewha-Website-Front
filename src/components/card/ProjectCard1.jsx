import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ProjectCard1 = ({ 
  project="프로젝트명",
  description="프로젝트 설명",
  tags=[],
  imageSrc = DEFAULT_IMAGE
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
        <Project className="h4-bold">{project}</Project>
        <Description className="body-regular">{description}</Description>
        <TagWrapper>
          {tags.map((tag, index) => (
            <Tag key={index} className="footnote-regular">#{tag}</Tag>
          ))}
        </TagWrapper>
      </CardText>
    </CardWrapper>
  );
};

export default ProjectCard1;

const CardWrapper = styled.div`
  display: flex;
  width: 19.375rem;
  height: 22.125rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 1rem;

  background: var(--cool-neutral-98);
  border-radius: 1.25rem;

  transition: all 0.2s ease;

  @media (max-width: 1129px) {
    width: 100%;
  }

  @media (max-width: 799px) {
    width: 100%;
    height: 17.125rem;
    gap: 1rem;
    border-radius: 0.75rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    height: 10rem;
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
    padding: 0 0.88rem 1rem 0.88rem;
  }
`;

const Project = styled.div`
  color: var(--neutral-20);
  font-family: Pretendard, sans-serif;
  font-size: 1.25rem;
  margin-bottom: 0.38rem;

  transition: all 0.2s ease;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 799px) {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
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

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    -webkit-line-clamp: 1;
    margin-bottom: 0.5rem;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  color: var(--neutral-70);
  font-family: 'Pretendard', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
`;