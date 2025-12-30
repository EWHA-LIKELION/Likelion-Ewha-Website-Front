import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SegmentBar from '/src/components/SegmentBar.jsx';
import DropDown1 from '/src/components/dropdown/Dropdown1';
import ProjectCard1 from '/src/components/card/ProjectCard1';

const ITEMS_PER_PAGE = 6; //페이지 당 카드 수
const PAGE_BUTTON_LIMIT = 4; //페이지 네이션 4개씩

function Project() {
    const navigate = useNavigate();

    const [category, setCategory] = useState('전체'); //project segmentbar
    const [currentPage, setCurrentPage] = useState(1);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* 예시 데이터 */
    const projects = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `프로젝트 ${i + 1}`,
    }));

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProjects = projects.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
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

    /*프로젝트 클릭시 상세 페이지로 이동*/
    const handleDetailPage = () => {
        navigate('/ProjectDetail');
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
                        onSelect={(index, item) => setCategory(item)}
                    />
                ) : (
                    <DropDown1
                        options={['전체', '해커톤', '졸업 프로젝트', '대동제 사이트']}
                        defaultValue={category}
                        onSelect={(value) => setCategory(value)}
                    />
                )}
                
                <DropDown1
                    options={['전체', '13기', '12기', '11기', '10기']}
                    defaultValue={'전체'}
                    onSelect={(value) => console.log('선택:', value)}
                />
            </ListContainer>

            {/*기수 선택별 프로젝트 수*/}
            <Count className='h5-regular'>00개</Count>

            {/*프로젝트*/}
            <ProjectGrid>
                {currentProjects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => navigate('/project/detail')}
                        style={{ cursor: 'pointer' }}
                    >
                        <ProjectCard1
                            project="AI 추천 서비스"
                            description="사용자 상태 기반 맞춤 추천 프로젝트"
                            tags={['AI', 'React', 'UX']}
                            styleType={1}
                        />
                    </div>
                ))}
            </ProjectGrid>

            {/*페이지 네이션*/}
            <Pagination>
                <PageBtn
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
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
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </PageBtn>
                ))}

                <PageBtn
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    <img src='../../icons/rightPagination.svg' />
                </PageBtn>
            </Pagination>
            </Contents>
        </ProjectWrapper>
    )
};

export default Project;

const ProjectWrapper = styled.div`
    width: 100%;
`

const Contents = styled.div`
    width: 100%;
    max-width: 971px;
    padding: 80px 80px 160px 80px;
    gap: 20px;
    display: flex;
    flex-direction: column;

    @media (max-width: 799px) { /* 모바일 */
        padding: 32px 16px 60px 16px;
        gap: 16px;
    }
`

const PageInfo = styled.div`
    width: 412px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (max-width: 412px) {
        width: 348px;
    }
`

const PageName = styled.p`
    color: var(--Neutral-20, #2A2A2A);
    font-family: Bayon;
    font-size: 40px;
    font-weight: 400;
    line-height: 46px;

    @media (max-width: 799px) { /* 모바일 */
        font-size: 32px;
        line-height: 90%;
    }
`

const PageLabel = styled.p`
    color: var(--Neutral-20, #2A2A2A);

    @media (max-width: 799px) { /* 모바일 */
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
    }
`

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Count = styled.p`
    color: var(--Neutral-70, #9B9B9B);

    @media (max-width: 799px) {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
    }
`

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 799px) {
        grid-template-columns: 1fr;
    }
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
`

const PageBtn = styled.button`
    display: flex;
    width: 40px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: none;
    background: ${({ active }) => (active ? 'var(--Cool-Neutral-98, #F4F4F5)' : 'transparent')};
    color: ${({ active }) => (active ? 'var(--Neutral-20)' : 'var(--Neutral-70, #9B9B9B)')};
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`