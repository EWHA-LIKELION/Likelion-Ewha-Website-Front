import { useState, useEffect } from "react";
import CloverIcon from "@/assets/icons/clover.svg?react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SegmentBar from "@/components/SegmentBar";
import Curriculum from "@/pages/home/Curriculum";
import ProjectCard3 from "@/components/card/ProjectCard3";
import Carousel2 from "@/components/carousel/Carousel2";
import { MainButton } from "@/components/buttons/MainButtons";
import { intercollegiates } from "@/data";
import { useIsMobile } from "@/hooks";

const HomeMid = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // part: 'pm', 'fe', 'be' 중 하나
  const [part, setPart] = useState("pm");
  // SegmentBar 인덱스와 part 매핑
  const partMap = ["pm", "fe", "be"];

  const handleSelect = (index) => {
    setPart(partMap[index]);
  };

  useEffect(() => {
    const partParam = searchParams.get("part");
    if (partParam && partMap.includes(partParam)) {
      setPart(partParam);
    }
  }, [searchParams]);

  const handleProjectMore = () => {
    navigate("/project");
  };

  return (
    <Wrapper>
      <Section className="curriculum" id="curriculum">
        <CloverIcon className="logo-icon" />
        <Title className="point-eng-h2">curriculum</Title>
        <SubTitle className={isMobile ? "point-kor-h5" : "point-kor-h3"}>
          처음부터 차근 차근, 기초부터 심화까지
        </SubTitle>
        <SegmentBar
          className="segment-bar-margin"
          items={["기획·디자인", "프론트엔드", "백엔드"]}
          size="s"
          tone="light"
          onSelect={handleSelect}
          selected={partMap.indexOf(part)}
        />
        <Curriculum part={part} />
      </Section>
      <Section className="events">
        <CloverIcon className="logo-icon" />
        <Title className="point-eng-h2">intercollegiate events</Title>
        <SubTitle className={isMobile ? "point-kor-h5" : "point-kor-h3"}>
          다양한 연합 행사에 참가하여 {isMobile && <br />}
          실전 감각과 포트폴리오 쌓기
        </SubTitle>
        <ProjectWrapper>
          {intercollegiates.map((item, idx) => (
            <ProjectCard3
              key={idx}
              project={item.project}
              description={item.description}
              notice={item.notice}
              imageSrc={item.imageSrc}
            />
          ))}
        </ProjectWrapper>
      </Section>
      <Section className="projects">
        <CloverIcon className="logo-icon" />
        <Title className="point-eng-h2">projects</Title>
        <SubTitle className={isMobile ? "point-kor-h5" : "point-kor-h3"}>
          아기사자와 운영진들의 {isMobile && <br />}
          다양한 프로젝트를 확인해보세요!
        </SubTitle>
        <Carousel2 />
        <MainButton variant="dark" size="auto" onClick={handleProjectMore}>
          프로젝트 더보기
        </MainButton>
      </Section>
    </Wrapper>
  );
};

export default HomeMid;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .logo-icon {
    color: #05da5b;
    width: 2rem;
    height: 2.14988rem;
    margin-bottom: 0.75rem;
    transition: all 0.2s ease;
  }

  @media (max-width: 799px) {
    .logo-icon {
      width: 1.25rem;
      height: 1.34369rem;
      margin-bottom: 0;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.75rem 5rem;

  transition: all 0.2s ease;

  &.projects {
    padding: 3.75rem 0 6.25rem 0;
  }

  .segment-bar-margin {
    margin: 2rem 0 2.5rem 0;
  }

  @media (max-width: 799px) {
    padding: 2rem 1rem;

    .segment-bar-margin {
      margin: 1.5rem 0 2rem 0;
    }
  }
`;

const Title = styled.div`
  color: var(--neutral-20);

  transition: all 0.2s ease;

  @media (min-width: 800px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  color: var(--neutral-50);

  transition: all 0.2s ease;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.25rem;
  gap: 1.25rem;

  transition: all 0.2s ease;

  @media (max-width: 799px) {
    margin-top: 2rem;
  }
`;
