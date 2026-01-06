import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { HomeButton } from '@/components/buttons/MainButtons_pc';
import { HomeButtonMobile } from '@/components/buttons/MainButtons_mo';

// 상태별 설정
const STATUS_CONFIG = {
  pass: {
    title: (roundName) => `${roundName} 합격을 축하드립니다!`,
    getMessage: (roundName, applicantName, generation) => {
      if (roundName === '1차') {
        return `안녕하세요, ${applicantName}님.\n이화여대 멋쟁이 사자처럼 ${generation} 아기사자 모집에\n1차 합격하신 것을 진심으로 축하드립니다!\n\n면접 평가는 하단에 기재된 일정에 따라 진행될 예정입니다.`;
      } else {
        return `안녕하세요, ${applicantName}님.\n이화여대 멋쟁이 사자처럼 ${generation} 아기사자로 선발되었습니다!\n최종 합격을 진심으로 축하드리며,\n1년간 멋사에서 지원자 분의 열정과 성장을 응원하겠습니다.\n\nOT의 경우 카카오톡 단체방 개설 후 이를 통해\n전달드릴 예정이오니,\n카카오톡 친구 추가 허용 부탁드리겠습니다.`;
      }
    },
  },
  fail: {
    title: (roundName) => `${roundName} 결과 안내드립니다.`,
    getMessage: (roundName, applicantName, generation) => {
      if (roundName === '1차') {
        return (
          <>
            안녕하세요, {applicantName}님.<br />
            이화여대 멋쟁이 사자처럼 {generation} 아기사자 모집에<br />
            지원해주셔서 감사합니다.<br /><br />
            아쉽게도 1차 서류 심사 결과, <HighlightText>최종 선발 대상에는<br />
            포함되지 않으셨음</HighlightText>을 안내드립니다.<br />
            제출해 주신 지원서는 신중하고 꼼꼼하게 검토되었으며,<br />
            그 과정에서 {applicantName}님의 열정과 가능성을 확인할 수 있었습니다.<br /><br />
            멋쟁이사자처럼에 관심을 가져주셔서 감사드리며,<br />
            앞으로의 도전과 성장을 응원하겠습니다.
          </>
        );
      } else {
        return (
          <>
            안녕하세요, {applicantName}님.<br />
            이화여대 멋쟁이 사자처럼 {generation} 아기사자 모집에<br />
            지원해주셔서 감사합니다.<br /><br />
            아쉽게도 최종 심사 결과, <HighlightText>이번 기수 아기사자로<br />
            선발되지 않으셨음</HighlightText>을 안내드립니다.<br />
            제출해 주신 지원서는 신중하고 꼼꼼하게 검토되었으며,<br />
            그 과정에서 {applicantName}님의 열정과 가능성을 확인할 수 있었습니다.<br /><br />
            멋쟁이사자처럼에 관심을 가져주셔서 감사드리며,<br />
            앞으로의 도전과 성장을 응원하겠습니다.
          </>
        );
      }
    },
  },
  pending: {
    title: (roundName) => `${roundName} 심사 중입니다.`,
    getMessage: (roundName, applicantName, generation) => `안녕하세요, ${applicantName}님.\n이화여자대학교 멋쟁이사자처럼 ${generation} 아기사자 모집 ${roundName} 심사가\n예정보다 지연되어 현재 결과 확인이 어려운 상황입니다.\n불편을 드려 진심으로 사과드리며,\n빠른 시일 내에 심사를 완료한 후 문자로 안내드리겠습니다.`,
  }
};

const RecruitResult = () => {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);
  const round = resultData?.round;
  const roundName = round === '1' ? '1차' : '최종';
        
  useEffect(() => {
    const handleResize = () => {
    setIsMobile(window.innerWidth <= 799);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // TODO: API 연동
    // fetchResult().then(data => {
    //   setResultData(data);
    //   setLoading(false);
    // });

    // Mock 데이터 (임시)
    setTimeout(() => {
      setResultData({
        applicantName: '홍길동', // API에서 받아올 지원자 이름
        generation: '14기', // API에서 받아올 기수 정보
        round: '1', // API에서 받아올 라운드 정보 ('1' 또는 '2')
        status: 'pass', // 'pass' | 'fail' | 'pending'
        nextStep: {
          title: '면접 일정',
          date: '00월 00일 00시',
          location: '포스코관 314호',
        }
      });
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <LoadingWrapper className='body-regular'>
          <LoadingSpinner />
          <p>결과를 불러오는 중입니다...</p>
        </LoadingWrapper>
      </Wrapper>
    );
  }

  const config = STATUS_CONFIG[resultData.status];

  return (
    <Wrapper>
      <ResultCard $status={resultData.status}>
        <ResultWrapper>
          <ResultTitle className={isMobile ? "point-kor-h4" : 'point-kor-h2'}>{typeof config.title === 'function' ? config.title(roundName, resultData.applicantName) : config.title}</ResultTitle>
          <ResultMessage className={isMobile ? "body-regular" : 'h5-medium'}>{config.getMessage(roundName, resultData.applicantName, resultData.generation)}</ResultMessage>
        </ResultWrapper>

        {resultData.status === 'pass' && round === '1' && resultData.nextStep && (
          <NextStepBox>
            <NextStepTitle className='h5-bold'>{resultData.nextStep.title}</NextStepTitle>
            <NextStepInfo>
              <InfoRow>
                <Label className='body-bold'>일시</Label>
                <Value className='body-regular'>{resultData.nextStep.date} {resultData.nextStep.time}</Value>
              </InfoRow>
              <InfoRow>
                <Label className='body-bold'>장소</Label>
                <Value className='body-regular'>{resultData.nextStep.location}</Value>
              </InfoRow>
            </NextStepInfo>
          </NextStepBox>
        )}
      </ResultCard>

      <HomeButtonWrapper>
        <HomeButton onClick={() => navigate("/")}/>
      </HomeButtonWrapper>
      <HomeButtonMobileWrapper>
        <HomeButtonMobile onClick={() => navigate("/")}/>
      </HomeButtonMobileWrapper>
    </Wrapper>
  );
};

export default RecruitResult;

const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.75rem;

  background: var(--static-white);

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    min-height: calc(100vh - 4rem);
    padding: 0 1rem;
    gap: 3.12rem;
  }
`;

const ResultCard = styled.div`
  width: 42.69rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.3125rem;
  padding: 3.125rem 7.5rem;

  border-radius: 1.25rem;
  border: 2px solid var(--cool-neutral-95, #DBDCDF);

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    width: 100%;
    padding: 1.8125rem 1.6875rem;
    border-radius: 1rem;
    gap: 2.56rem;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

const ResultTitle = styled.h2`
  color: var(--primary-sub);
  text-align: center;

  transition: all 0.2s ease;
`;

const ResultMessage = styled.p`
  color: var(--neutral-20);
  text-align: center;
  white-space: pre-wrap;

  transition: all 0.2s ease;
`;

const NextStepBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 5.44rem;

  border-radius: 1.25rem;
  background: var(--green-95);

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    padding: 1rem 3rem;
    border-radius: 1rem;
  }
`;

const NextStepTitle = styled.h3`
  color: var(--neutral-20);
  text-align: center;
`;

const NextStepInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  color: var(--neutral-40);
  min-width: 40px;
`;

const Value = styled.span`
  color: var(--neutral-20);
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    color: var(--neutral-40);
  }
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-main);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const HighlightText = styled.span`
  color: var(--primary-sub);
`;

const HomeButtonWrapper = styled.div`
  display: block;
  
  @media (max-width: 799px) {
    display: none;
  }
`;

const HomeButtonMobileWrapper = styled.div`
  display: none;
  
  @media (max-width: 799px) {
    display: block;
  }
`;
