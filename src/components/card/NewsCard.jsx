import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE = "/icons/defaultImg.svg";

const NewsCard = ({ imageSrc = DEFAULT_IMAGE }) => {
  return (
    <CardWrapper>
      <CardImage 
        src={imageSrc} 
        alt="news image"
        onError={(e) => {
          e.target.src = DEFAULT_IMAGE;
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
