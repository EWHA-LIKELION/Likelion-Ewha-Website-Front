import styled from 'styled-components';
import ProjectCard1 from '/src/components/card/ProjectCard1';
import { projects } from '@/data';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDetail() {
    const { id } = useParams();
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

                    <ProjectImg>
                        <img src={project.image} />
                    </ProjectImg>

                    <Member>
                        <p className="h4-bold" style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))' }}>프로젝트 팀원</p>
                        <PartContainer>
                            {Object.entries(project.team).map(([part, members]) => (
                                <Part key={part}>
                                    <p className='h5-bold' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))' }}>{part.toUpperCase()}</p>
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
                            <p className='h4-bold' style={{ color: 'var(--Atomic-Neutral-70, var(--Neutral-70, #9B9B9B))', alignItems: 'center' }}>
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
    overflow-x: hidden;
`

const Thumbnail = styled.div`
    width: 100%;
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
    flex-wrap: wrap;
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
    flex-wrap: wrap;
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
    gap: 10px;

    p {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
    }

    .rightarrow {
        width: 8px;
        height: 16px;
        display: block;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 799px) {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        gap: 8px;

        .rightarrow {
            width: 7px;
            height: 14px;
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