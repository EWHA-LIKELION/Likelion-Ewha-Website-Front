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
                                    position={m.role}
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
    padding: 80px 80px 160px 80px;

    @media (max-width: 799px) {
        padding: 32px 16px 60px 16px;
    }
`

const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 971px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    @media (min-width: 800px) {
        p.h5-regular {
            font-size: 16px;
        }

        p.h3-bold {
            font-size: 24px;
        }
    }
`

const PeopleInfo = styled.div`
    width: 100%;
`

const PeopleLabel = styled.p`
    color: var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A));
    font-family: Bayon;
    font-size: 40px;
    font-weight: 400;
    line-height: 46px;

    @media (max-width: 799px) {
        font-size: 32px;
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
    gap: 20px;

    /*  1줄 */
    @media (min-width: 320px) and (max-width: 349px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /*  2줄 */
    @media (min-width: 350px) and (max-width: 519px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    @media (min-width: 520px) and (max-width: 799px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    /* 3줄 */
    @media (min-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Design1 = styled.div`
    position: absolute;
    top: -20px;
    left: 40px;
    
    img {
        aspect-ratio: 230 / 145;
        width: 230px;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 799px) {
        left: 45px;
        top: 0;

        img {
            width: 60px;
        }
    }
`

const Design2 = styled.div`
    position: absolute;
    top: 323px;
    right: -40px;
    
    img {
        aspect-ratio: 230 / 145;
        width: 224px;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 799px) {
        right: -12px;
        top: 215px;

        img {
            width: 60px;
        }
    }
`

const Design3 = styled.div`
    position: absolute;
    top: 1014px;
    left: -40px;
    
    img {
        aspect-ratio: 230 / 145;
        width: 192px;
        height: auto;
        object-fit: contain;
    };

    @media (max-width: 799px) {
        left: -12px;
        top: 485px;

        img {
            width: 60px;
        }
    }
`