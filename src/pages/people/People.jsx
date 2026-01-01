import styled from 'styled-components';
import DropDown1 from '/src/components/dropdown/Dropdown1';
import MemberCard from '/src/components/card/MemberCard';
import SegmentBar from '/src/components/SegmentBar';

function People() {
    return (
        <PeopleWrapper>
            <Container>
                <PeopleInfo>
                    <PeopleLabel>PEOPLE</PeopleLabel>
                    <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-20, var(--Neutral-20, #2A2A2A))', fontSize: '16px'}}>이화여대 멋쟁이사자처럼 운영진과 아기사자들을 소개합니다!</p>
                </PeopleInfo>

                <DropDown1
                    options={['13기', '12기', '11기', '10기']}
                    defaultValue={'13기'}
                    onSelect={(value) => console.log('선택:', value)}
                />

                <Lion>
                    <p className='h3-bold' style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))', textAlign: 'center'}}>운영진</p>
                    <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))', fontSize: '16px', marginBottom: '32px'}}>이화여대 멋쟁이사자처럼 00기 운영진입니다.</p>
                    <LionCardGrid>
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            position='운영진'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                        />
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            position='운영진'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                        />
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            position='운영진'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                        />
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            position='운영진'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                        />
                    </LionCardGrid>
                </Lion>

                <Lion>
                    <p className='h3-bold' style={{ color: 'var(--Atomic-Neutral-30, var(--Neutral-30, #474747))', textAlign: 'center', marginTop: '40px'}}>아기사자</p>
                    <p className='h5-regular' style={{ color: 'var(--Atomic-Neutral-50, var(--Neutral-50, #737373))', fontSize: '16px', marginBottom: '24px'}}>이화여대 멋쟁이사자처럼 00기 기획디자인 아기사자입니다.</p>
                    <SegmentBar
                        items={['기획•디자인', '프론트엔드', '백엔드']}
                                        styleType={1}
                                        onSelect={(index, item) => setCategory(item)}
                                    />
                    <LionCardGrid style={{ marginTop: '60px'}}>
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                            showPosition='false'
                        />
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                            showPosition='false'
                        />
                        <MemberCard
                            name='서예린'
                            part='프론트엔드'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                            showPosition='false'
                        />
                    </LionCardGrid>
                </Lion>
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
        padding: 32px 12px 60px 12px;
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

    /* 380px 미만: 1줄 */
    @media (max-width: 379px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /* 380px ~ 649px: 2줄 */
    @media (min-width: 380px) and (max-width: 970px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    /* 971px 이상: 3줄 */
    @media (min-width: 971px) {
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