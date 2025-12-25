import React from "react";
import styled from "styled-components";

const NewsCard = ({ imageSrc = "/icons/defaultImg.svg", alt = "디폴트 이미지" }) => {
  return (
    <CardWrapper>
      <CardImage 
        src={imageSrc} 
        alt={alt}
        onError={(e) => {
          e.target.src = "/icons/defaultImg.svg";
        }}
      />
    </CardWrapper>
  );
};

export default NewsCard;

const CardWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
