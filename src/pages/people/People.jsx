import styled from 'styled-components';
import DropDown1 from '/src/components/dropdown/Dropdown1';
import LionCard from '/src/components/card/LionCard';
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
                        <LionCard
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
                        <LionCard
                            name='서예린'
                            part='프론트엔드'
                            department='컴퓨터공학과 25'
                            imageScr='../../images/default1.png'
                            showPosition='false'
                        />
                    </LionCardGrid>
                </Lion>
            </Container>
        </PeopleWrapper>
    )
};

export default People;

const PeopleWrapper = styled.div`
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 100%;
    max-width: 971px;
    display: flex;
    padding: 80px 80px 160px 80px;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    @media (max-width: 799px) {
        padding: 32px 12px 60px 12px;
    }

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

    @media (max-width: 799px) {
        grid-template-columns: 1fr;
    }
`