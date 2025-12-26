// Test용 코드입니다
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <h1 style={{ marginBottom: 16 }}>Main Content</h1>
      {Array.from({ length: 60 }).map((_, i) => (
        <Card key={i}>카드 {i + 1}</Card>
      ))}
    </>
  );
};

export default Home;

const Card = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;
