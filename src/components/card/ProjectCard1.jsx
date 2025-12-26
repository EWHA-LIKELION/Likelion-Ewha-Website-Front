import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ProjectCard1 = ({ 
  project="프로젝트명",
  description="프로젝트 설명",
  tags=[],
  imageSrc = DEFAULT_IMAGE, 
  styleType = 1
}) => {
  return (
    <CardWrapper $styleType={styleType}>
      <CardImage 
        src={imageSrc} 
        alt="project image"
        onError={(e) => {
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      <CardText>
        <Project $styleType={styleType} className="h4-bold">{project}</Project>
        <Description className="body-regular">{description}</Description>
        <TagWrapper>
          {tags.map((tag, index) => (
            <Tag key={index} className="caption-regular">#{tag}</Tag>
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
  min-width: 19.375rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 1rem;

  background: ${(props) => (props.$styleType === 1 ? 'var(--cool-neutral-98)' : 'var(--static-white)')};
  border-radius: 1.25rem;
  border: ${(props) => (props.$styleType === 1 ? 'none' : '1px solid var(--neutral-95)')};

  @media (max-width: 1129px) {
    width: ${(props) => (props.$styleType === 1 ? '100%' : '19.375rem')};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
`;

const CardText = styled.div`
  width: 100%;
  padding: 0 1.25rem;
  text-align: left;
`;

const Project = styled.div`
  color: var(--neutral-20);
  font-family: ${(props) => (props.$styleType === 1 ? 'Pretendard, sans-serif' : '"Cafe24 PRO Slim", sans-serif')};
  font-size: ${(props) => (props.$styleType === 1 ? '1.25rem' : '1.5rem')};
  margin-bottom: ${(props) => (props.$styleType === 1 ? '0.38rem' : '0.5rem')};
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
`;

const Tag = styled.span`
  color: var(--neutral-70);
  font-family: 'Pretendard', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
`;