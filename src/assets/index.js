/**
 * src/assets 아래의 이미지·아이콘을 번들 URL로 변환한다.
 *
 * JSON 데이터(members, projects, news 등)에 저장된 "/images/..." 형태의 경로를
 * 그대로 유지하기 위한 리졸버. 정적으로 경로가 정해진 곳에서는 그냥 import 해도 된다.
 *
 *   asset("/icons/logo.svg")            -> /assets/logo-a1b2c3.svg
 *   asset("/images/members/김채연.jpg")  -> /assets/김채연-d4e5f6.jpg
 */
const modules = import.meta.glob("./**/*.{png,jpg,jpeg,svg,webp,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});

// 한글 파일명은 OS에 따라 자모 분리(NFD)/결합(NFC) 형태가 달라서 NFC로 통일한다.
const assets = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [
    path.replace(/^\.\//, "/").normalize("NFC"),
    url,
  ]),
);

export const asset = (path) => {
  if (!path) return path;
  // 외부 URL이나 data URI는 그대로 통과시킨다.
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  const url = assets[path.normalize("NFC")];
  if (!url && import.meta.env.DEV) {
    console.warn(`[asset] src/assets 에서 찾을 수 없는 경로입니다: ${path}`);
  }
  return url ?? path;
};

export default asset;
