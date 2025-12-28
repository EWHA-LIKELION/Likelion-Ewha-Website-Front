import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const LionCard = ({ 
  name = "이름", 
  part = "파트명", 
  position = "직책", 
  department = "00학과 25", 
  imageSrc = DEFAULT_IMAGE, 
  showPosition = false 
}) => {
  return (
    <CardWrapper>
      <CardImage 
        src={imageSrc} 
        alt="people image"
        onError={(e) => {
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      <div>
        <Name className="h4-bold">{name}</Name>
        <PartPosition className="h5-regular">
          <p>{part}</p>
          {showPosition && (
            <>
              <Line>|</Line>
              <p>{position}</p>
            </>
          )}
        </PartPosition>
        <Department className="body-regular">{department}</Department>
      </div>
    </CardWrapper>
  );
};

export default LionCard;

const CardWrapper = styled.div`
  display: flex;
  width: 19.375rem;
  height: 22.125rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 1.5rem;

  border-radius: 1.25rem;
  background: var(--cool-neutral-98);

  @media (max-width: 1129px) {
    width: 100%;
    min-width: 19.375rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
`;

const Name = styled.div`
  color: var(--neutral-20);
  margin-bottom: 0.38rem;
`;

const PartPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.12rem;
  color: var(--neutral-30);
`;

const Line = styled.div`
  color: var(--neutral-70);
`;

const Department = styled.div`
  color: var(--neutral-70);
`;