import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const MemberCard = ({ 
  name = "이름", 
  part = "파트명", 
  position = "직책", 
  department = "00학과 25", 
  imageSrc = DEFAULT_IMAGE, 
  showPosition = false 
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
        alt="people image"
        onError={(e) => {
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      <div>
        <Name className={isMobile ? "h5-bold" : "h4-bold"}>{name}</Name>
        <PartPosition className={isMobile ? "body-regular" : "h5-regular"}>
          <p>{part}</p>
          {showPosition && (
            <>
              <Line>|</Line>
              <p>{position}</p>
            </>
          )}
        </PartPosition>
        <Department className={isMobile ? "footnote-regular" : "body-regular"}>{department}</Department>
      </div>
    </CardWrapper>
  );
};

export default MemberCard;

const CardWrapper = styled.div`
  display: flex;
  width: 19.375rem;
  height: 22.125rem;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 1.5rem;
  transition: all 0.2s ease;

  border-radius: 1.25rem;
  background: var(--cool-neutral-98);

  @media (max-width: 1129px) {
    width: 100%;
  }

  @media (max-width: 799px) {
    gap: 1rem;
    height: 16.375rem;
    border-radius: 0.625rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
  transition: all 0.2s ease;

  @media (max-width: 799px) {
    height: 8.75rem;
  }
`;

const Name = styled.div`
  color: var(--neutral-20);
  margin-bottom: 0.38rem;
  text-align: center;
  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-bottom: 0.25rem;
  }
`;

const PartPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.12rem;
  color: var(--neutral-30);
  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-bottom: 0.75rem;
  }
`;

const Line = styled.div`
  color: var(--neutral-70);
`;

const Department = styled.div`
  color: var(--neutral-70);
  text-align: center;
`;