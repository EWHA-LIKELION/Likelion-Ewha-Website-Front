import styled from 'styled-components';
import ProjectCard1 from '/src/components/card/ProjectCard1';
import { projects } from '@/data';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProjectDetail() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const navigate = useNavigate();
    const projectList = projects.projects;

    const currentIndex = projectList.findIndex(p => p.id === id);
    if (currentIndex === -1) return <div>프로젝트를 찾을 수 없습니다.</div>;

    const project = projectList[currentIndex];

    const TOTAL_DISPLAY = 3;

    // 이전/다음 균형 계산
    let prevCount = Math.floor(TOTAL_DISPLAY / 2);
    let nextCount = TOTAL_DISPLAY - prevCount;

    // 범위 조정: 시작 또는 끝에 가까우면
    if (currentIndex < prevCount) {
        nextCount += prevCount - currentIndex;
        prevCount = currentIndex;
    }
    if (currentIndex + nextCount >= projectList.length) {
        const overflow = currentIndex + nextCount - (projectList.length - 1);
        prevCount += overflow;
        nextCount -= overflow;
    }

    const prevProjects = projectList.slice(currentIndex - prevCount, currentIndex);
    const nextProjects = projectList.slice(currentIndex + 1, currentIndex + 1 + nextCount);
    const moreProjects = [...prevProjects, ...nextProjects];

    const hasDetailImages =
        Array.isArray(project.detailImages) && project.detailImages.length > 0;

    return (
        <DetailWrapper>
            <Thumbnail>
                <img src={project.thumbnail || '/images/default1.png'} />
            </Thumbnail>

            <Container>
                <Project>
                    <ProjectLabel>
                        <p className='h3-bold' style={{ color: 'var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A))' }}>{project.title}</p>
                        <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>{project.generation} {project.category}</p>
                    </ProjectLabel>

                    <ProjectContent className="h5-regular" style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>{project.description}</ProjectContent>

                    <ReferContent>
                        <Refer>
                            <p className="h5-bold" style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>URL</p>
                            <a
                                href={project.urls.service}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))',
                                    cursor: 'pointer',
                                }}
                            >
                                <p className="body-regular">{project.urls.service}</p>
                            </a>
                        </Refer>

                        <Refer>
                            <p className="h5-bold" style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>GITHUB</p>
                            <a
                                href={project.urls.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))',
                                    cursor: 'pointer',
                                }}
                            >
                                <p className="body-regular">{project.urls.github}</p>
                            </a>
                        </Refer>
                    </ReferContent>

                    {/*상세 이미지 데이터 없는 경우 비활성화*/}
                    {hasDetailImages && (
                        <ScrollInner>
                            <ProjectImg>
                                <ImageScroll>
                                    {project.detailImages.map((img, idx) => (
                                        <ImgCard key={idx}>
                                            <img src={img} />
                                        </ImgCard>
                                    ))}
                                </ImageScroll>
                            </ProjectImg>
                        </ScrollInner>
                    )}

                    <Member>
                        <p className="h4-bold" style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>프로젝트 팀원</p>
                        <PartContainer>
                            {Object.entries(project.team).map(([part, members]) => (
                                <Part key={part}>
                                    <p className='h5-bold' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>{part.replace('pmdesign', 'PM/DESIGN').toUpperCase()}</p>
                                    {members.map(member => (
                                        <PartMember key={member}>{member}</PartMember>
                                    ))}
                                </Part>
                            ))}
                        </PartContainer>
                    </Member>

                    {/*더 둘러보기*/}
                    <MoreContent>
                        <MoreLabel onClick={() => navigate('/project')}>
                            <p className='h4-bold' style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>더 둘러보기</p>
                            <p className='h4-bold' style={{ color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))', alignItems: 'center', display: 'flex', gap: '5px' }}>
                                목록으로
                                <img className="rightarrow" src='/icons/arrowRightProject.svg' />
                            </p>
                        </MoreLabel>

                        {/*프로젝트*/}
                        <ProjectGrid>
                            {moreProjects.map((p) => (
                                <div
                                    key={p.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/project/detail/${p.id}`)}
                                >
                                    <ProjectCard1
                                        project={p.title}
                                        description={p.description}
                                        tags={[p.generation, p.category]}
                                        imageSrc={p.thumbnail || '/images/default1.png'}
                                        styleType={1}
                                    />
                                </div>
                            ))}
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
    position: relative;
`

const Thumbnail = styled.div`
    width: 100%;
    overflow: hidden;

    img {
        height: 33.75rem;
        width: 100%;
        object-fit: cover;
        display: block;
        background: var(--Neutral-95, #DCDCDC);
    }

    @media (max-width: 49.9999rem) {
        img {
            height: 12.5rem;
        }
    }
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    box-sizing: border-box;

    padding: 3.25rem 5rem 10rem 5rem;

    @media (max-width: 49.9999rem) {
        padding: 1.5rem 1rem;
    }
`

const Project = styled.div`
    width: 100%;
    max-width: 60.6875rem;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (min-width: 50rem) {
        p.h3-bold {
            font-size: 1.5rem;
        }

        p.h4-bold {
            font-size: 1.25rem;
        }

        p.h5-regular, p.h5-bold {
            font-size: 1rem;
        }

        p.body-regular {
            font-size: 0.875rem;
        }
    }

    @media (max-width: 49.9999rem) {
        p.h3-bold {
            font-size: 1.25rem;
        }

        p.h4-bold {
            font-size: 1rem;
        }
        p.h5-regular, p.h5-bold {
            font-size: 0.875rem;
        }

        p.footnote-regular, p.body-regular {
            font-size: 0.75rem;
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

    @media (max-width: 49.9999rem) {
        margin-top: -12px;
    }
`

const ReferContent = styled.div`
    display: flex;
    flex-wrap: wrap;

    column-gap: 2.5rem;
    row-gap: 0.5rem;
`

const Refer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
`

const ScrollInner = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    @media (min-width: 70.625rem) {
        max-width: 60.6875rem;
    }

`;

const ProjectImg = styled.div`
    width: 100%;
`

const ImageScroll = styled.div`
    margin: 2.75rem 0;
    padding: 1rem;

    display: flex;
    gap: 1.25rem;

    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    @media (max-width: 49.9999rem) {
        margin: 0.25rem 0;
        gap: 0.5rem;
    }
`

const ImgCard = styled.div`
    flex: 0 0 auto;

    &:first-child {
        margin-left: -1rem;
    }

    img {
        width: 18.75rem;
        height: 31.25rem;
        border-radius: 1rem;
    
        border: 0.125rem solid var(--Line-Neutral, rgba(112, 115, 124, 0.16));
        background: lightgray;
        box-shadow: 0 0.5rem 1rem 0 rgba(24, 24, 27, 0.10);

        overflow: hidden;
    }

    @media (max-width: 49.9999rem) {
        img {
            width: 15.9375rem;
            height: 25rem;
            aspect-ratio: 9/16;
            border-radius: 0.5rem;
            border: 0.0625rem solid var(--Line-Neutral, rgba(112, 115, 124, 0.16));
        }
    }
`

const Member = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const PartContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5rem;
    flex-wrap: wrap;
`
const Part = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`

const PartMember = styled.div`
    color: var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B));
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "DM Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem;

    @media (max-width: 49.9999rem) {
        font-size: 0.875rem;
    }
`

const MoreContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-top: 3.75rem;

    @media (max-width: 49.9999rem) {
        margin-top: 1.25rem;
    }
`

const MoreLabel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.625rem;

    p {
        display: inline-flex;
        align-items: center;
        gap: 0.0375rem;
        cursor: pointer;
    }

    .rightarrow {
        width: 0.5rem;
        height: 1rem;
        display: block;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 49.9999rem) {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem;
        gap: 0.5rem;

        .rightarrow {
            width: 0.4375rem;
            height: 0.875rem;
            object-fit: contain;
        }
    }
`

const ProjectGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 18.75rem));
    justify-content: space-between;
    gap: 1.25rem;

    /*  1줄 */
    @media (max-width: 21.8125rem) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    /*  2줄 */
    @media (min-width: 21.875rem) and (max-width: 32.4375rem) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    @media (min-width: 32.5rem) and (max-width: 49.9999rem) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    /* 3줄 */
    @media (min-width: 50rem) {
        grid-template-columns: repeat(3, 1fr);
    }
`