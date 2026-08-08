import styled from "styled-components";
import Reset from "@/assets/icons/reset.svg?react";
import Close from "@/assets/icons/close-black.svg?react";

const FilterChip = ({ children, onClick, isReset = false }) => {
  return (
    <Chip onClick={onClick} $isReset={isReset}>
      {children}
      {isReset ? <Reset /> : <Close />}
    </Chip>
  );
};

export default FilterChip;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.25rem;

  border-radius: 2.5rem;
  border: 1px solid var(--cool-neutral-97);

  color: var(--neutral-30);
  font-size: 0.875rem;
  font-weight: 400;

  background: ${(props) =>
    props.$isReset ? "var(--static-white)" : "var(--cool-neutral-99)"};

  cursor: pointer;

  &:hover {
    filter: brightness(0.97);
  }
`;
