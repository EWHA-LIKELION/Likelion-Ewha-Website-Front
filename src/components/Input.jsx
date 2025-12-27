import React, { useId, useState } from 'react';
import styled, { css } from 'styled-components';

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

function Input({
  variant = 'code', // 'code' | 'form' | 'auth'
  label,
  required = false,
  placeholder,
  type = 'text',
  multiline = false,
  error = false,
  helperText,
  errorMessage,
  subText,
  startIcon,
  endIcon,
  value,
  onChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();
  const hasValue = value !== undefined && value !== '';

  /** input 상태 */
  const inputState = error
    ? 'error'
    : isFocused
    ? 'focused'
    : 'default';

  return (
    <Wrapper>
      {/* ---------------- Label (form / auth) ---------------- */}
      {(variant === 'form' || variant === 'auth') && label && (
        <Label htmlFor={inputId} $variant={variant} $state={inputState}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}

      {/* ---------------- Sub Text (form only) ---------------- */}
      {variant === 'form' && subText && (
        <SubText $multiline={multiline}>{subText}</SubText>
      )}

      {/* ---------------- Input Box ---------------- */}
      <InputBox $variant={variant} $state={inputState} $multiline={multiline}>
        {startIcon && <Icon>{startIcon}</Icon>}

        {multiline ? (
          <StyledTextArea
            id={inputId}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <StyledInput
            id={inputId}
            $variant={variant}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}

        {endIcon && <Icon>{endIcon}</Icon>}
      </InputBox>

      {/* ---------------- Helper / Error ---------------- */}
      {error
        ? errorMessage && <ErrorText $variant={variant}>{errorMessage}</ErrorText>
        : helperText && <HelperText>{helperText}</HelperText>}
    </Wrapper>
  );
}

export default Input;

/* -------------------------------------------------------------------------- */
/*                              Styled Components                              */
/* -------------------------------------------------------------------------- */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 799px) { /* 모바일 */
    gap: 4px;
  }
`;

/* -------------------------------- Label -------------------------------- */

const Label = styled.label`
  color: #2a2a2a;
  font-weight: 700;
  font-size: 16px;

  @media (max-width: 799px) {
    font-size: 14px;
  }
`;

const Required = styled.span`
  margin-left: 2px;
  color: #FF7B2E;
  font-size: 16px;

  @media (max-width: 799px) { /* 모바일 */
    font-size: 12px;
  }
`;

/* ------------------------------ Sub Text ------------------------------ */

const SubText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #737373;

  ${({ $multiline }) =>
    $multiline &&
    css`
      margin-left: 20px;
    `}
`;

/* ----------------------------- Input Box ----------------------------- */

const InputBox = styled.div`
  display: flex;
  align-items: ${({ $multiline }) =>
    $multiline ? 'flex-start' : 'center'};
  border-radius: ${({ $multiline }) => ($multiline ? '12px' : '50px')};
  align-self: stretch;
  background: #F4F4F5;
  border-color: #F4F4F5;

  ${({ $variant, $state }) => {

    /* ---------- code (Text Inputs 1) ---------- */
    if ($variant === 'code') {
      if ($state === 'focused') {
        return css`
          border: 1px solid #F4F4F5;
        `;
      }
      return css`
        border: 1px solid #F4F4F5;
        width: 395px;
        height: 52px;
        padding: 12px 24px;
        font-size: 16px;
          @media (max-width: 799px) { /* 모바일 */
            width: 320px;
            height: 40px;
          }
      `;
    }

    /* ---------- form (Text Inputs 2) ---------- */
    if ($variant === 'form') {
      return css`
        border: 1px solid #F4F4F5;
        width: 535px;
        height: 46px;
        padding: 12px 20px;
          @media (max-width: 799px) { /* 모바일 */
            width: 316px;
            height: 36px;
          }
      `;
    }

    /* ---------- auth (Text Inputs 3) ---------- */
    if ($variant === 'auth') {
      return css`
        border: 1px solid #F4F4F5;
        width: 474px;
        height: 52px;
        padding: 14px 28px;
      `;
    }
  }}
`;

/* --------------------------- Input / Textarea -------------------------- */

const baseInputStyle = css`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #2A2A2A;
`;

const StyledInput = styled.input`
  ${baseInputStyle}

  ${({ $variant, $state }) => {
    /* ---------- code ---------- */
    if ($variant === 'code') {
      return css`
        &::placeholder {
          font-size: 16px;
          color: ${$state === 'focused' ? '#737373' : '#9B9B9B'};
          font-weight: 400;
        }
      `;
    }

    /* ---------- form ---------- */
    if ($variant === 'form') {
      return css`
        &::placeholder {
          color: #9B9B9B;
          font-size: 14px;
          font-weight: 400;
        }
      `;
    }

    /* ---------- auth ---------- */
    if ($variant === 'auth') {
      return css`
        &::placeholder {
          color: #9B9B9B;
          font-weight: 400;
          font-size: 16px;
        }
      `;
    }
  }}
`;

const StyledTextArea = styled.textarea`
  ${baseInputStyle}
  resize: none;
  height: 266px;
`;

/* -------------------------------- Icon -------------------------------- */

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 6px;
`;

/* -------------------------- Helper / Error ---------------------------- */

const HelperText = styled.span`
  font-size: 14px;
  color: #FF7B2E;
`;

const ErrorText = styled.span`
  color: #FF7B2E;
  font-weight: 400;

  ${({ $variant }) => {
    if ($variant === 'code') {
      return css`
        font-size: 14px;
      `;
    }

    if ($variant === 'form') {
      return css`
        font-size: 12px;
      `;
    }

    if ($variant === 'auth') {
      return css`
        font-size: 14px;
      `;
    }
  }}
`;