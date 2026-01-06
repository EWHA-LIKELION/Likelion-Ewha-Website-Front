export default function AdminPreview() {
  return (
    <div>
      <h1>ADMIN PREVIEW</h1>
      {Array.from({ length: 80 }).map((_, i) => (
        <p key={i}>스크롤 테스트용 더미 텍스트 {i + 1}</p>
      ))}
    </div>
  );
}
