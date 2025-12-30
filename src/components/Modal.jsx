import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import closeIcon from "../../public/images/close.svg";
import copyIcon from "../../public/images/copy.svg";

/* =========================
   1) Base 
========================= */
function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useEscClose(enabled, onClose) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, onClose]);
}

function getModalRoot() {
  let el = document.getElementById("modal-root");
  if (!el) {
    el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el);
  }
  return el;
}

/* =========================
   2) BaseModal- 가장 기본 틀
========================= */
export function BaseModal({
  open,
  onClose,
  children,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  ariaLabel = "dialog",
}) {
  useLockBodyScroll(open);
  useEscClose(open && closeOnEsc, onClose);

  const portalEl = useMemo(() => getModalRoot(), []);

  if (!open) return null;

  return createPortal(
    <Overlay
      onMouseDown={(e) => {
        if (!closeOnOverlay) return;
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <Dialog
        role="dialog"
        aria-label={ariaLabel}
        $size={size}
        data-media={size === "media"}
      >
        {showClose && size !== "media" && (
          <CloseBtn
            onClick={onClose}
            aria-label="닫기"
            type="button"
          ></CloseBtn>
        )}
        {children}
      </Dialog>
    </Overlay>,
    portalEl
  );
}

/* =========================
   3) 통합 Modal
========================= */
export function Modal({
  open,
  onClose,

  size = "md",
  showClose = true,
  type = "info", // info | confirm | form | result | image
  title, // 텍스트
  description,
  align: alignProp, // 정렬은 왼쪽정렬이랑 가운데 정렬로 나눔 - "left" | "center"
  input, // form 입력받는 폼 있을 때
  helper,
  icon,
  code, //result , 완료창 보여줄 떄
  note,
  image, //이미지만 띄울때

  // actions
  actions = [],
  closeOnOverlay = true,
  closeOnEsc = true,
}) {
  const align = alignProp ?? (showClose ? "left" : "center");

  const hasHeader = Boolean(title || description);
  const hasIcon = Boolean(icon);
  const hasForm = Boolean(input);
  const hasResult = Boolean(code?.value || note);
  const hasImage = Boolean(image?.src);

  // 이미지만 있는 모달
  const isImageOnly =
    type === "image" &&
    hasImage &&
    !hasHeader &&
    !hasForm &&
    !hasResult &&
    !hasIcon &&
    actions.length === 0;

  const actionsLayout = actions.some((a) => a.fullWidth) ? "full" : "row";

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      size={isImageOnly ? "media" : size}
      showClose={isImageOnly ? false : showClose}
      closeOnOverlay={closeOnOverlay}
      closeOnEsc={closeOnEsc}
    >
      <Wrap $align={align} $type={type} $isImageOnly={isImageOnly}>
        {showClose && (
          <CloseBtn onClick={onClose} aria-label="닫기" type="button">
            <img src={closeIcon} alt="닫기" />
          </CloseBtn>
        )}
        {hasIcon && (
          <IconSlot>
            {typeof icon === "string" ? (
              <IconEmoji aria-hidden>{icon}</IconEmoji>
            ) : icon?.src ? (
              <IconImg src={icon.src} alt={icon.alt ?? "icon"} />
            ) : (
              icon
            )}
          </IconSlot>
        )}

        {hasHeader && (
          <Header $align={align}>
            {title && <Title className="h3-bold">{title}</Title>}
            {description && <Desc className="h5-regular">{description}</Desc>}
          </Header>
        )}

        {hasImage && (
          <MediaWrap $isImageOnly={isImageOnly} $width={image.width}>
            {showClose && isImageOnly && (
              <CloseOnImage onClick={onClose} aria-label="닫기" type="button">
                ×
              </CloseOnImage>
            )}

            <MediaImg
              src={image.src}
              alt={image.alt ?? "preview"}
              $fit={image.fit ?? "cover"}
            />
          </MediaWrap>
        )}
        {/*  Result */}
        {hasResult && (
          <ResultWrap $align={align}>
            {code?.value && (
              <CodeBlock>
                {code?.label && (
                  <CodeLabel className="footnote-bold">{code.label}</CodeLabel>
                )}
                <CodeRow>
                  <CodeValue>{code.value}</CodeValue>
                  {code.copyable !== false && (
                    <CopyBtn
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(code.value);
                        } catch {
                          window.prompt("복사해서 사용하세요:", code.value);
                        }
                      }}
                      aria-label="복사"
                    >
                      <img src={copyIcon} alt="복사" />
                    </CopyBtn>
                  )}
                </CodeRow>
              </CodeBlock>
            )}

            {note && <Note className="footnote-regular">{note}</Note>}
          </ResultWrap>
        )}

        {/*  Form */}
        {hasForm && (
          <Body>
            <Input
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
              disabled={input.disabled}
            />
          </Body>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <Actions $layout={actionsLayout} $type={type}>
            {actions.map((a, idx) => {
              const handleClick = (e) => {
                a.onClick?.(e);
                if (a.closeOnClick !== false) onClose?.();
              };

              if (a.href) {
                return (
                  <ActionLink
                    key={idx}
                    $variant={a.variant}
                    href={a.href}
                    target={a.target ?? "_self"}
                    rel={
                      a.rel ??
                      (a.target === "_blank"
                        ? "noreferrer noopener"
                        : undefined)
                    }
                    onClick={handleClick}
                    aria-disabled={a.disabled ? "true" : "false"}
                    $fullWidth={!!a.fullWidth}
                  >
                    {a.label}
                  </ActionLink>
                );
              }

              return (
                <ActionBtn
                  key={idx}
                  type="button"
                  $variant={a.variant}
                  onClick={handleClick}
                  disabled={a.disabled}
                  $fullWidth={!!a.fullWidth}
                >
                  {a.label}
                </ActionBtn>
              );
            })}
          </Actions>
        )}

        {helper && (
          <Helper>
            <span className="footnote-regular">{helper.text}</span>
            <button type="button" onClick={helper.onAction}>
              {helper.actionText}
            </button>
          </Helper>
        )}
      </Wrap>
    </BaseModal>
  );
}

/* =========================
   4) styles
========================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 9999;
`;

const Dialog = styled.div`
  position: relative;
  max-width: 100%;

  width: ${({ $size }) => {
    if ($size === "sm") return "360px";
    if ($size === "lg") return "720px";
    if ($size === "media") return "auto";
    return "29.6875rem"; //기본  ,
  }};

  /* 기본(일반 모달) */
  background: var(--common-100);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 1px rgba(24, 24, 27, 0.3), 0 8px 16px rgba(24, 24, 27, 0.1);

  /* image-only(media)면 카드(흰 배경) 제거 */
  &[data-media="true"] {
    background: transparent;
    border-radius: 0;
    box-shadow: none;
    overflow: visible;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Wrap = styled.div`
  padding: ${({ $type, $isImageOnly }) =>
    $type === "image" && $isImageOnly ? "0" : "2.5rem"};
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === "left" ? "flex-start" : "center")};
`;

const Header = styled.div`
  width: 100%;
  text-align: ${({ $align }) => $align};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--neutral-20);
`;

const Desc = styled.p`
  margin: 0;
  color: var(--neutral-50);
  white-space: pre-line;
`;

const Body = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 999px;
  border: 1px solid var(--line-alternative);
  background: var(--neutral-99);
  padding: 0 1rem;
  outline: none;

  &:focus {
    border-color: var(--primary-main);
    background: var(--common-100);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Helper = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  text-align: center;
  color: var(--neutral-50);

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--neutral-50); /* 설명글과 같은 회색 */
    text-decoration: underline; /* 밑줄 추가 */
    font-weight: 700;
  }
`;

/* Icon */
const IconSlot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const IconEmoji = styled.div`
  font-size: 28px;
  line-height: 1;
`;

const IconImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
`;

/* Result 스타일  */
const ResultWrap = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === "left" ? "flex-start" : "center")};
`;

const CodeBlock = styled.div`
  width: 100%;
  margin-top: 0.75rem;
`;

const CodeLabel = styled.div`
  color: var(--neutral-20);
  margin-bottom: 0.5rem;
  text-align: left; /* 라벨은 왼쪽 정렬 */
  width: 100%;
`;

const CodeRow = styled.div`
  width: 100%;
  height: 3rem;

  /* 테두리와 배경을 여기로 옮김 (필드처럼 보이게) */
  border-radius: 999px;
  border: 1px solid var(--line-alternative);
  background: var(--neutral-99);

  display: flex;
  align-items: center;

  /* 버튼이 들어갈 공간 확보를 위해 패딩 조절 */
  padding: 0 0.5rem 0 1rem;
  gap: 0.5rem;
`;

const CodeValue = styled.div`
  flex: 1;
  /* 기존의 높이, 테두리, 배경 제거 */

  display: flex;
  align-items: center;
  color: var(--neutral-20);
  font-weight: 700;

  /* 글자가 길면 ... 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyBtn = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%; /* 완전 원형 */
  border: 1px solid var(--Cool-Neutral-98, #f4f4f5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 아이콘 크기/색상 */
  font-size: 1.2rem;
  color: var(--neutral-40);
`;

const Note = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  color: var(--primary-sub); /* 주황색 */
  text-align: center;
`;

/* Media 스타일 */

const MediaWrap = styled.div`
  position: relative;
  /* width 값이 들어오면 그걸 쓰고, 없으면 기본 피그마상 값으로 설정 */
  width: ${({ $width }) => $width || "58.125rem"};
  max-width: 80vw;
`;

const MediaImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px; /* 피그마 이미지 라운드 */
  object-fit: ${({ $fit }) => $fit};
  background: var(--neutral-99);
`;

const CloseOnImage = styled.button`
  position: absolute;

  top: 0;
  left: calc(100% + 0.5rem);

  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;

  font-size: 28px;
  line-height: 1;
  color: #fff; /* 오버레이 위라 흰색이 잘 보임 */
`;

/* Actions */
const Actions = styled.div`
  width: 100%;
  margin-top: ${({ $type }) =>
    $type === "form" || $type === "result" ? "0.75rem" : "2.5rem"};
  display: flex;
  gap: 0.5rem;
  justify-content: center; /* PC 기본 유지 */

  /* ✅ 여기부터 '좁을 때만' */
  @media (max-width: 560px) {
    justify-content: stretch;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;

  min-width: 11.5rem;
  height: 3.25rem;
  padding: 0.875rem 2.5rem;

  border-radius: 62.4375rem;
  cursor: pointer;
  font-weight: 700;
  flex: ${({ $fullWidth }) => ($fullWidth ? "1" : "0")};

  @media (max-width: 560px) {
    min-width: 0;
    flex: 1 1 0;
    max-width: 100%;
    padding: 0.875rem 1.25rem; /* 필요하면 유지/조절 */
  }

  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "var(--primary-main)"
        : $variant === "danger"
        ? "var(--red-50)"
        : "var(--neutral-95)"};

  background: ${({ $variant }) =>
    $variant === "primary"
      ? "var(--primary-main)"
      : $variant === "danger"
      ? "var(--red-50)"
      : "var(--common-100)"};

  color: ${({ $variant }) =>
    $variant === "primary" || $variant === "danger"
      ? "var(--common-100)"
      : "var(--neutral-40)"};

  &:disabled {
    background: var(--interaction-disabled);
    border-color: var(--interaction-disabled);
    color: var(--common-100);
    cursor: not-allowed;
  }
`;

const ActionLink = styled.a`
  height: 3.25rem;
  padding: 0 2.5rem;
  border-radius: 62.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  flex: ${({ $fullWidth }) => ($fullWidth ? "1" : "0")};
  text-decoration: none;
  @media (max-width: 560px) {
    min-width: 0;
    flex: 1 1 0;
    max-width: 100%;
    padding: 0 1.25rem;
  }

  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "var(--primary-main)"
        : $variant === "danger"
        ? "var(--red-50)"
        : "var(--neutral-95)"};

  background: ${({ $variant }) =>
    $variant === "primary"
      ? "var(--primary-main)"
      : $variant === "danger"
      ? "var(--red-50)"
      : "var(--common-100)"};

  color: ${({ $variant }) =>
    $variant === "primary" || $variant === "danger"
      ? "var(--common-100)"
      : "var(--neutral-40)"};

  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.55;
  }
`;
