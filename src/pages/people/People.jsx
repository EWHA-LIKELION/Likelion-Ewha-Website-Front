import styled from 'styled-components';
import DropDown1 from '/src/components/dropdown/Dropdown1';
import MemberCard from '/src/components/card/MemberCard';
import SegmentBar from '/src/components/SegmentBar';
import { members } from '@/data';
import { useState, useEffect } from 'react';

function People() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const [selectedGeneration, setSelectedGeneration] = useState('13기');
    const [selectedPart, setSelectedPart] = useState('전체');

    // 기수 필터 (공통)
    const filteredByGeneration = members.members.filter(
        m => m.generation === selectedGeneration
    );

    // 운영진
    const managers = filteredByGeneration.filter(
        m => m.role === '운영진'
    );

    // 파트 필터 (아기사자만)
    const lions = filteredByGeneration
    .filter(m => m.role === '아기사자')
    .filter(m => selectedPart === '전체' || m.part === selectedPart);

    return (
        <PeopleWrapper>
            <Container>
                <PeopleInfo>
                    <PeopleLabel>PEOPLE</PeopleLabel>
                    <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A))', fontSize: '16px'}}>이화여대 멋쟁이사자처럼 운영진과 아기사자들을 소개합니다!</p>
                </PeopleInfo>

                {/* 기수 선택 */}
                <DropDown1
                    options={['13기', '12기', '11기', '10기']}
                    defaultValue={'13기'}
                    onSelect={(value) => setSelectedGeneration(value)}
                />

                {/* 운영진 */}
                {managers.length > 0 && (
                    <Lion>
                        <p className='h3-bold' style={{ color: '#474747', textAlign: 'center'}}>운영진</p>
                        <p className='h5-regular' style={{ color: '#737373', fontSize: '16px', marginBottom: '32px'}}>
                            {selectedGeneration} 운영진입니다.
                        </p>
                        <LionCardGrid>
                            {managers.map(m => (
                                <MemberCard
                                    key={m.id}
                                    name={m.name}
                                    part={m.part}
                                    position={m.position || m.role}
                                    department={m.department}
                                    imageSrc={m.photo || '/images/default1.png'}
                                    showPosition
                                />
                            ))}
                        </LionCardGrid>
                    </Lion>
                )}

                {/* 아기사자 */}
                {lions.length > 0 && (
                    <Lion>
                        <p className='h3-bold' style={{ color: '#474747', textAlign: 'center', marginTop: '40px'}}>아기사자</p>
                        <p className='h5-regular' style={{ color: '#737373', fontSize: '16px', marginBottom: '24px'}}>
                            {selectedGeneration} 아기사자입니다.
                        </p>

                        {/* 파트 필터 */}
                        <SegmentBar
                            items={['전체', '기획•디자인', '프론트엔드', '백엔드']}
                            styleType={1}
                            onSelect={(index, item) => setSelectedPart(item)}
                        />

                        <LionCardGrid style={{ marginTop: '60px'}}>
                            {lions
                                .filter(m => selectedPart === '전체' || m.part === selectedPart)
                                .map(m => (
                                    <MemberCard
                                        key={m.id}
                                        name={m.name}
                                        part={m.part}
                                        department={m.department}
                                        imageSrc={m.photo || '/images/default1.png'}
                                        showPosition={false}
                                    />
                                ))
                            }
                        </LionCardGrid>
                    </Lion>
                )}
            </Container>

            <Design1><img src='/icons/designOrange.svg' /></Design1>
            <Design2><img src='/icons/designGreen.svg' /></Design2>
            <Design3><img src='/icons/designOrange2.svg' /></Design3>
        </PeopleWrapper>
    )
};

export default People;

const PeopleWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 5rem 5rem 10rem 5rem;

    @media (max-width: 49.9999rem) {
        padding: 2rem 1rem 3.75rem 1rem;
    }
`

const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 60.6875rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;

    @media (min-width: 50rem) {
        p.h5-regular {
            font-size: 1rem;
        }

        p.h3-bold {
            font-size: 1.5rem;
        }
    }
`

const PeopleInfo = styled.div`
    width: 100%;
`

const PeopleLabel = styled.p`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: Bayon;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 2.875rem;

    @media (max-width: 49.9999rem) {
        font-size: 2rem;
        line-height: 90%;
    }
`

const Lion = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LionCardGrid = styled.div`
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
    left: -42.5rem;
    
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