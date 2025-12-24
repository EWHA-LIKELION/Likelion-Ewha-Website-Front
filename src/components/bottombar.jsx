import styled from "styled-components";

const BottomBar = () => {
  // Back to top 클릭 시 스크롤 상단 이동
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Footer>
      <Inner>
        <TopRow>
          <LogoWrap>
            <img src="/icons/logo_buttom.svg" alt="LIKELION EWHA" />
          </LogoWrap>

          <BackToTopButton type="button" onClick={handleBackToTop}>
            <BackToTopText>Back to top</BackToTopText>
            <BackToTopIcon src="/icons/back_to_top.svg" alt="" />
          </BackToTopButton>
        </TopRow>

        <LeftStack>
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
        </LeftStack>

        <Divider />

        <Copyright>
          Copyright © LIKELION EWHA | All Rights Reserved
        </Copyright>
      </Inner>
    </Footer>
  );
};

export default BottomBar;


const Footer = styled.footer`
  display: flex;
  justify-content: center;
  background: var(--neutral-15, #1c1c1c);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;

  /* PC: 가운데 970px 컨텐츠 */
  max-width: 970px;

  @media (min-width: 800px) {
    padding: 40px 0;
  }

  /* MO: 좌우 20px 고정 + 전체 화면 기준 */
  @media (max-width: 799px) {
    width: 100%;
    max-width: none;            
    padding: 24px 20px 40px;    
    gap: 17px;
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

  img {
    display: block;
    height: auto;
    width: auto;
  }
`;

const BackToTopButton = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 28px 0;

  background: transparent;
  border: none;
  cursor: pointer;
`;

const BackToTopText = styled.span`
  color: var(--neutral-95, #dcdcdc);
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const BackToTopIcon = styled.img`
  display: block;
`;

const LeftStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const EmailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EmailLabel = styled.div`
  color: var(--neutral-70, #9b9b9b);
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  line-height: 20px;
`;

const EmailValue = styled.div`
  color: var(--neutral-95, #dcdcdc);
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  line-height: 24px;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18.824px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;

  img {
    display: block;
  }
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid var(--line-strong, #70737c85);
`;

const Copyright = styled.div`
  margin-top: 32px;
  color: var(--neutral-50, #737373);
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  line-height: 22px;
`;
