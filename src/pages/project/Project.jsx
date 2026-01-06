import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SegmentBar from '/src/components/SegmentBar.jsx';
import DropDown1 from '/src/components/dropdown/Dropdown1';
import ProjectCard1 from '/src/components/card/ProjectCard1';
import { projects } from "@/data";

const ITEMS_PER_PAGE = 6; //페이지 당 카드 수
const PAGE_BUTTON_LIMIT = 4; //페이지 네이션 4개씩

function Project() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const CATEGORY_MAP = {
        '전체': null,
        '해커톤': ['중앙아이디어톤', '중앙해커톤', '신촌SW창업경진대회', '여기톤'],
        '졸업 프로젝트': ['졸업프로젝트'],
        '대동제 사이트': ['대동제'],
    };

    const [category, setCategory] = useState('전체'); //project segmentbar
    const [generation, setGeneration] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    const projectList = projects.projects;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* 데이터 필터링 */
    const filteredProjects = projectList.filter(project => {
        const categoryMatch =
            category === '전체' || (CATEGORY_MAP[category]?.includes(project.category));
        const generationMatch =
            generation === '전체' || project.generation === generation;
        return categoryMatch && generationMatch;
    });

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const currentProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    /* 페이지네이션 */
    const currentGroup = Math.ceil(currentPage / PAGE_BUTTON_LIMIT);
    const startPage = (currentGroup -1) * PAGE_BUTTON_LIMIT + 1;
    const endPage = Math.min(startPage + PAGE_BUTTON_LIMIT - 1, totalPages);

    /*페이지 클릭시 스크롤*/
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ProjectWrapper>
            <Contents>
            {/*페이지 정보*/}
            <PageInfo>
                <PageName>PROJECT</PageName>
                <PageLabel className='h5-regular'>이화여대 아기사자와 운영진들의 다양한 프로젝트를 확인해보세요!</PageLabel>
            </PageInfo>

            {/*프로젝트 종류 및 기수 필터*/}
            <ListContainer>
                {!isMobile ? (
                    <SegmentBar
                        items={['전체', '해커톤', '졸업 프로젝트', '대동제 사이트']}
                        styleType={1}
                        onSelect={(i, item) => {
                            setCategory(item);
                            setCurrentPage(1);
                        }}
                    />
                ) : (
                    <DropDown1
                        options={['전체', '해커톤', '졸업 프로젝트', '대동제 사이트']}
                        defaultValue={category}
                        onSelect={(value) => {
                            setCategory(value);
                            setCurrentPage(1);
                        }}
                    />
                )}
                
                <DropDown1
                    options={['전체', '13기', '12기', '11기', '10기']}
                    defaultValue={'전체'}
                    onSelect={(value) => {
                        setGeneration(value);
                        setCurrentPage(1);
                    }}
                />
            </ListContainer>

            {/*기수 선택별 프로젝트 수*/}
            <Count className='h5-regular'>{filteredProjects.length}개</Count>

            {/*프로젝트*/}
            <ProjectGrid>
                {currentProjects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/project/detail/${project.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <ProjectCard1
                            project={project.title}
                            description={project.description}
                            tags={[project.generation, project.category]}
                            imageSrc={project.thumbnail || '/images/default1.png'}
                            styleType={1}
                        />
                    </div>
                ))}
            </ProjectGrid>

            {/*페이지 네이션*/}
            <Pagination>
                <PageBtn
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <img src='../../icons/leftPagination.svg' />
                </PageBtn>

                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <PageBtn
                        className='h5-bold'
                        key={page}
                        $active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </PageBtn>
                ))}

                <PageBtn
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <img src='../../icons/rightPagination.svg' />
                </PageBtn>
            </Pagination>
            </Contents>

            <Design1><img src='/icons/designOrange.svg' /></Design1>
            <Design2><img src='/icons/designGreen.svg' /></Design2>
            <Design3><img src='/icons/designOrange2.svg' /></Design3>
        </ProjectWrapper>
    )
};

export default Project;

const ProjectWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 5rem 5rem 10rem 5rem;

    @media (max-width: 49.9999rem) { /* 모바일 */
        padding: 2rem 1rem 3.75rem 1rem;
        gap: 1rem;
    }
`

const Contents = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 60.6875rem;
    gap: 1.25rem;
    display: flex;
    flex-direction: column;
`

const PageInfo = styled.div`
    width: 25.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @media (max-width: 25.75rem) {
        width: 21.75rem;
    }
`

const PageName = styled.p`
    color: var(--Neutral-20, #2A2A2A);
    font-family: Bayon;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 2.875rem;

    @media (max-width: 49.9999rem) { /* 모바일 */
        font-size: 2rem;
        line-height: 90%;
    }
`

const PageLabel = styled.p`
    color: var(--Neutral-20, #2A2A2A);

    @media (max-width: 49.9999rem) { /* 모바일 */
        font-family: Pretendard;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.375rem;
    }
`

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Count = styled.p`
    color: var(--Neutral-70, #9B9B9B);

    @media (max-width: 49.9999rem) {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1.25rem;
    }
`

const ProjectGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2.5rem;
`

const PageBtn = styled.button`
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    border: none;
    background: ${({ $active }) => ($active ? 'var(--Cool-Neutral-98, #F4F4F5)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--Neutral-20)' : 'var(--Neutral-70, #9B9B9B)')};
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`

const Design1 = styled.div`
    position: absolute;
    top: -1.25rem;
    left: 2.5rem;
    
    img {
        aspect-ratio: 230 / 145;
        width: 14.375rem;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 49.9999rem) {
        left: 2.8125rem;
        top: 0;

        img {
            width: 3.75rem;
        }
    }
`

const Design2 = styled.div`
    position: absolute;
    top: 20.1875rem;
    right: -2.5rem;
    
    img {
        aspect-ratio: 230 / 145;
        width: 14rem;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 49.9999rem) {
        right: -0.75rem;
        top: 13.4375rem;

        img {
            width: 3.75rem;
        }
    }
`

const Design3 = styled.div`
    position: absolute;
    top: 63.375rem;
    left: -2.5rem;

    img {
        aspect-ratio: 230 / 145;
        width: 12rem;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 49.9999rem) {
        left: -0.75rem;
        top: 30.3125rem;

        img {
            width: 3.75rem;
        }
    }
`