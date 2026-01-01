import styled from "styled-components";

const BottomBar = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Footer>
      <Inner>
        <TopRow>
          <LogoWrap>
            <img src="/icons/groupbottom.svg" alt="LIKELION EWHA" />
          </LogoWrap>

          <BackToTopButton type="button" onClick={handleBackToTop}>
            <BackToTopText>Back to top</BackToTopText>
            <BackToTopIcon src="/icons/backtotop.svg" alt="" />
          </BackToTopButton>
        </TopRow>

        <Content>
          <EmailBlock>
            <EmailLabel>Email</EmailLabel>
            <EmailValue>ewha@likelion.org</EmailValue>
          </EmailBlock>

          <SocialRow>
            <SocialLink href="https://www.instagram.com/likelion_ewha/">
              <img src="/icons/instagram.svg" alt="Instagram" />
            </SocialLink>
            <SocialLink href="https://github.com/EWHA-LIKELION">
              <img src="/icons/github.svg" alt="GitHub" />
            </SocialLink>
            <SocialLink href="https://pf.kakao.com/_htxexfd">
              <img src="/icons/kakaotalk.svg" alt="KakaoTalk" />
            </SocialLink>
            <SocialLink href="https://linktr.ee/likelion.ewha">
              <img src="/icons/linktree.svg" alt="Linktree" />
            </SocialLink>
          </SocialRow>

          <BottomLine>
            <Copyright>
              Copyright © LIKELION EWHA | All Rights Reserved
            </Copyright>
          </BottomLine>
        </Content>
      </Inner>
    </Footer>
  );
};

export default BottomBar;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--neutral-15, #1c1c1c);
`;

/* MO 공통 시작점: 좌우 20px 기준선 */
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 800px) {
    max-width: 970px;
    padding: 40px 0;
    gap: 32px;
  }

  @media (max-width: 799px) {
    padding: 24px 20px 40px;
    gap: 17px;
    align-items: flex-start;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoWrap = styled.div`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;

  img {
    display: block;

    @media (max-width: 799px) {
      width: 185.329px;
      height: 40px;
    }
  }
`;

const BackToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;

  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const BackToTopText = styled.span`
  color: var(--neutral-95, #dcdcdc);
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  white-space: nowrap;
`;

const BackToTopIcon = styled.img`
  display: block;
  width: 20px;
  height: 20px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 17px;
  align-items: flex-start;
`;

const EmailBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EmailLabel = styled.div`
  color: var(--neutral-70, #9b9b9b);
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  line-height: 16px;
  width: 100%;
`;

const EmailValue = styled.div`
  color: var(--neutral-95, #dcdcdc);
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  line-height: 16px;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
`;

const BottomLine = styled.div`
  display: flex;
  padding-top: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 0.5px solid var(--neutral-50, #737373);
`;

const Copyright = styled.div`
  color: var(--neutral-50, #737373);
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 10px;
  line-height: 16px;
`;
