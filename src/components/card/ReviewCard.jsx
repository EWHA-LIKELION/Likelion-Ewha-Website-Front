import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const ReviewCard = ({ 
  title = "제목", 
  content = "내용", 
  name = "이름", 
  part = "파트명", 
  position = "직책", 
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
    <CardStack>
        <Card>
            <Title className={isMobile ? "point-kor-h5":"point-kor-h3"}>{title}</Title>
            <Content className="footnote-regular">{content}</Content>
            <Name className="body-extrabold">{name}</Name>
            <PartPosition className="body-regular">
                <p>{part}</p>
                {showPosition && (
                <>
                    <p>|</p>
                    <p>{position}</p>
                </>
                )}
            </PartPosition>
        </Card>
        {!isMobile && 
        <>
          <Card className="num2"/>
          <Card className="num3"/>
        </>
        } 
    </CardStack>
  );
};

export default ReviewCard;


const CardStack = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  min-width: 36.3rem;
  overflow: visible;

  @media (max-width: 799px) {
    min-width: 16.5rem;
  }
`

const Card = styled.div`
  position: absolute;
  z-index: 3;

  display: flex;
  width: 100%;
  min-width: 36.3rem;
  height: 18.25863rem;
  flex-direction: column;
  align-items: start;
  padding: 2.58rem 2.53rem;
  overflow: hidden;

  border-radius: 1.04838rem;
  border: 0.699px solid var(--Line-Neutral, rgba(112, 115, 124, 0.16));
  background: var(--static-white);

  &.num2 {
    background: #f1f1f1;
    z-index: 2;
    top: -15px;
    right: -15px;
  }

  &.num3 {
    background: #f1f1f1;
    z-index: 1;
    top: -30px;
    right: -30px;
  }

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 0.94rem 1.25rem;
    height: auto;
    min-width: 16.5rem;
  }
`;

const Title = styled.div`
  color: var(--neutral-20);
  margin-bottom: 0.62rem;
  text-align: left;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-bottom: 0.5rem;
    display: flex;
  }
`;

const Content = styled.div`
  margin-bottom: 1.25rem;
  color: var(--neutral-60);
  text-align: left;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  align-self: stretch;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    display: flex;
  }
`;

const Name = styled.div`
  color: var(--neutral-20);
`;

const PartPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--cool-neutral-40);
`;