import styled from 'styled-components';
import ProjectCard1 from '/src/components/card/ProjectCard1';

function ProjectDetail() {
    return (
        <DetailWrapper>
            <Thumbnail>
                <img src="../../images/default1.png" />
            </Thumbnail>

            <Container>
                <Project>
                    <ProjectLabel>
                        <p className='h3-bold' style={{ color: 'var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A))' }}>프로젝트명</p>
                        <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>00기 중앙해커톤</p>
                    </ProjectLabel>

                    <ProjectContent className="h5-regular" style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. 프로젝트 설명 영역입니다. </ProjectContent>

                    <ReferContent>
                        <Refer>
                            <p className="h5-bold" style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>URL</p>
                            <p className="body-regular" style={{ color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))' }}>urlurlurlurlurlurlurlurlurlurlurl</p>
                        </Refer>

                        <Refer>
                            <p className="h5-bold" style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>GITHUB</p>
                            <p className="body-regular" style={{ color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))' }}>githubgithubgithubgithubgithub</p>
                        </Refer>
                    </ReferContent>

                    <ProjectImg>
                        <img src="../../images/default1.png" />
                    </ProjectImg>

                    <Member>
                        <p className="h4-bold" style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>프로젝트 팀원</p>
                        <PartContainer>
                            <Part>
                                <p className='h5-bold' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>PM/DESIGN</p>
                                <PartMember>이름이</PartMember>
                                <PartMember>이름이</PartMember>
                            </Part>

                            <Part>
                                <p className='h5-bold' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>FRONTEND</p>
                                <PartMember>이름이</PartMember>
                                <PartMember>이름이</PartMember>
                            </Part>

                            <Part>
                                <p className='h5-bold' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>BACKEND</p>
                                <PartMember>이름이</PartMember>
                                <PartMember>이름이</PartMember>
                            </Part>
                        </PartContainer>
                    </Member>

                    <MoreContent>
                        <MoreLabel>
                            <p className='h4-bold' style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>더 둘러보기</p>
                            <p className='h4-bold' style={{ color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))', alignItems: 'center' }}>
                                목록으로
                                <img className="rightarrow" src='/icons/rightPagination.svg' />
                            </p>
                        </MoreLabel>

                        {/*프로젝트*/}
                        <ProjectGrid>
                            <ProjectCard1
                                project="AI 추천 서비스"
                                description="사용자 상태 기반 맞춤 추천 프로젝트"
                                tags={['AI', 'React', 'UX']}
                                styleType={1}
                            />
                            <ProjectCard1
                                project="AI 추천 서비스"
                                description="사용자 상태 기반 맞춤 추천 프로젝트"
                                tags={['AI', 'React', 'UX']}
                                styleType={1}
                            />
                            <ProjectCard1
                                project="AI 추천 서비스"
                                description="사용자 상태 기반 맞춤 추천 프로젝트"
                                tags={['AI', 'React', 'UX']}
                                styleType={1}
                            />
                        </ProjectGrid>
                    </MoreContent>
                </Project>
            </Container>
        </DetailWrapper>
    )
};

export default ProjectDetail;

const DetailWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
`

const Thumbnail = styled.div`
    width: 100%;
    aspect-ratio: 1440 / 400;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
        display: block;
    }
`

const Container = styled.div`
    width: 100%;
    display: flex;
    padding: 52px 80px 160px 80px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    @media (max-width: 799px) {
        padding: 24px 20px;
    }
`

const Project = styled.div`
    max-width: 971px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 800px) {
        p.h3-bold {
            font-size: 24px;
        }

        p.h5-regular, p.h5-bold, p.body-regular {
            font-size: 16px;
        }

        p.h5-bold {
            font-size: 20px;
        }
    }

    @media (max-width: 799px) {
        p.h4-bold, p.h5-regular {
            font-size: 20px;
        }

        p.footnote-regular {
            font-size: 12px;
        }

        p.h5-bold {
            font-size: 16px;
        }
    }
`

const ProjectLabel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const ProjectContent = styled.div`
    width: 100%;
`

const ReferContent = styled.div`
    display: flex;
    gap: 40px;
`

const Refer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
`

const ProjectImg = styled.div`
    width: 100%;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
        display: block;
    }
`

const Member = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const PartContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
`
const Part = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const PartMember = styled.div`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "DM Sans";
    font-size: 13.098px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.83px;
`

const MoreContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const MoreLabel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
    }

    .rightarrow {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }

    @media (max-width: 799px) {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;

        .rightarrow {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
    }
`

const ProjectGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 799px) {
        grid-template-columns: 1fr;
    }
`