import { asset } from "@/assets";
import projectsJson from "./projects.json";
import membersJson from "./members.json";
import intercollegiatesJson from "./intercollegiates.json";
import newsJson from "./news.json";
import curriculums from "./curriculums.json";
import { getFaqData } from "./faq.js";

// JSON에 적힌 "/images/..." 경로를 번들된 실제 URL로 바꿔서 내보낸다.
// 소비하는 컴포넌트는 받은 값을 그대로 src 에 넣으면 된다.
const projects = {
  projects: projectsJson.projects.map((project) => ({
    ...project,
    thumbnail: asset(project.thumbnail),
    detailImages: (project.detailImages ?? []).map(asset),
  })),
};

const members = {
  members: membersJson.members.map((member) => ({
    ...member,
    photo: asset(member.photo),
  })),
};

const intercollegiates = intercollegiatesJson.map((item) => ({
  ...item,
  imageSrc: asset(item.imageSrc),
}));

const news = newsJson.map((item) => ({ ...item, src: asset(item.src) }));

export { projects, members, intercollegiates, news, curriculums, getFaqData };

//사용하는 페이지에서 import { projects, members } from "@/data"; 이렇게 불러와서 사용
