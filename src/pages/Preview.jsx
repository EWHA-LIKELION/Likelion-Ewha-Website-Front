import AdminDropdown from "@/components/dropdown/AdminDropdown";
import Dropdown from "@/components/dropdown/Dropdown";

const Preview = () => {
  return (
    <>
      <span>
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
    </>
  );
};

export default Preview;
