import FilterChip from "@/components/chip/FilterChip";
import AdminDropdown from "@/components/dropdown/AdminDropdown";

const Preview = () => {
  return (
    <>
      <span style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <AdminDropdown
          placeholder="지원파트"
          options={["기획･디자인", "프론트엔드", "백엔드"]}
        />
        <AdminDropdown placeholder="면접방식" options={["대면", "비대면"]} />
        <AdminDropdown
          placeholder="결과"
          options={[
            "1차 심사중",
            "1차 합격",
            "1차 불합격",
            "최종 심사중",
            "최종 합격",
            "최종 불합격",
          ]}
        />
      </span>
      <br />
      <span style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <FilterChip>기획･디자인</FilterChip>
        <FilterChip>프론트엔드</FilterChip>
        <FilterChip>대면</FilterChip>
        <FilterChip>1차 심사중</FilterChip>
        <FilterChip isReset>초기화</FilterChip>
      </span>
    </>
  );
};

export default Preview;
