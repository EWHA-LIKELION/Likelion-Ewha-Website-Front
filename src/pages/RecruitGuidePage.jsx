import { useEffect, useState } from "react";
import RecruitGuidePageMo from "./RecruitGuidePage_mo";
import RecruitGuidePagePc from "./RecruitGuidePage/RecruitGuidePage_pc";

const BREAKPOINT = 800;

const RecruitGuidePage = () => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth < BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < BREAKPOINT);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <RecruitGuidePageMo /> : <RecruitGuidePagePc />;
};

export default RecruitGuidePage;
