import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecruitPart = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/recruit/apply/form");
    }; 

  return (
    <Wrapper>
      <Title className="point-eng-h1">RECRUIT</Title>
      <Description className="h5-regular">이화여대 멋쟁이사자처럼에서 함께할 아기사자를 모집합니다!</Description>
      <Date className="h3-extrabold">D-00</Date>
      <Period className="body-regular">0000년 00월 00일 ~ 00일</Period>
      <CardWrapper>
        <Card 
          className="pm"
          onClick={handleClick}
        >
            <PartName className="h4-extrabold">기획•디자인</PartName>
            <Apply className="h5-bold pm">
            <p>지원서 작성하기</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.35938 2.35938L14 7.99995L8.35938 13.6405" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13.9999 8L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            </Apply>
            <img src="/icons/recruitPartFlower.svg"/>
        </Card>
        <Card
          className="fe"
          onClick={handleClick}
        >
            <PartName className="h4-extrabold">프론트엔드</PartName>
            <Apply className="h5-bold fe">
            <p>지원서 작성하기</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.35938 2.35938L14 7.99995L8.35938 13.6405" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13.9999 8L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            </Apply>
            <img src="/icons/recruitPartFlower.svg"/>
        </Card>
        <Card 
          className="be"
          onClick={handleClick}
        >
            <PartName className="h4-extrabold">백엔드</PartName>
            <Apply className="h5-bold be">
            <p>지원서 작성하기</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.35938 2.35938L14 7.99995L8.35938 13.6405" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13.9999 8L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            </Apply>
            <img src="/icons/recruitPartFlower.svg"/>
        </Card>  
      </CardWrapper>
      <img className="num1" src="/icons/recruitPartBack1.svg"/>
      <img className="num2" src="/icons/recruitPartBack2.svg"/>
      <img className="num3" src="/icons/recruitPartBack3.svg"/>
    </Wrapper>
  );
}

export default RecruitPart;


const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  overflow: hidden;

  padding: 5rem;

  img.num1 {
    position: absolute;
    left: 2.89888rem;
    top: 0;
    z-index: 0;
  }
  img.num2 {
    position: absolute;
    right: 0;
    top: 17rem;
    z-index: 0;
  }
  img.num3 {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
`;

const Title = styled.div`
  width: 80%;
  font-size: 2.5rem;
  color: var(--neutral-20);
`;

const Description = styled.div`
  width: 80%;
  margin-bottom: 2.75rem;
  color: var(--neutral-20);
`;

const Date = styled.div`
  margin-bottom: 0.25rem;
  color: var(--primary-main);
`;

const Period = styled.div`
  margin-bottom: 1.5rem;
  color: var(--neutral-50);
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.button`
  width: 32rem;
  height: 10.25rem;

  position: relative;
  overflow: hidden;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  padding: 1.5rem 2rem;
  
  border: none;
  border-radius: 0.75rem;

  cursor: pointer;

  &:hover {
    filter: brightness(0.97);
  }

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &.pm {
    background: var(--green-90);
  }
  &.fe{
    background: var(--orange-80);
  }
  &.be{
    background: var(--blue-70);
  }
`;

const PartName = styled.div`
  color: var(--neutral-20);
`;

const Apply = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.38rem;

  &.pm {
    color: var(--green-30);
  }
  &.fe {
    color: var(--orange-30);
  }
  &.be {
    color: var(--blue-30);
  }
`;