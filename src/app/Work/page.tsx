"use client";
import { Ubuntu } from "next/font/google";
import { JSX, useEffect, useRef, useState } from "react";
import FilterButton from "../common/FilterButtonsOfWork";
import InlineText from "./components/InlineText";
import { Grid3x2, Rows4 } from "lucide-react";
import InlineButton from "../common/ProjectsInlineButton";
import InlineImage from "./components/InlineImage";
import { motion, useTransform, useScroll } from "framer-motion"
import Footer from "../components/Footer";
import { projects } from "@/constants/projects";
import { useLang } from "@/i18n/LanguageProvider";
import CurveTransition from "@/app/components/CurveTransition";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});


type FilterType = "All" | "Front-End" | "Full-Stack" | "Mobile";
type FilterProjectWithImageAndText = "inlineText" | "images";

const WorkPage = () => {
    const { t } = useLang();

    const [isTablet, setIsTablet] = useState(false);
    const [filter, setFilter] = useState<FilterType>("All");
    const [imageFilter, setImageFilter] =
        useState<FilterProjectWithImageAndText>("inlineText");
    const mainContainer = useRef(null)
    const filters: FilterType[] = ["All", "Front-End", "Full-Stack", "Mobile"];

    const filterWithImage: {
        value: FilterProjectWithImageAndText;
        icon: JSX.Element;
    }[] = [
            { value: "inlineText", icon: <Rows4 /> },
            { value: "images", icon: <Grid3x2 /> },
        ];

    const counts: Record<FilterType, number> = {
        All: projects.length,
        "Front-End": projects.filter((p) =>
            p.role.toLowerCase().includes("front")
        ).length,
        "Full-Stack": projects.filter((p) =>
            p.role.toLowerCase().includes("full")
        ).length,
        Mobile: projects.filter((p) =>
            p.role.toLowerCase().includes("mobile")
        ).length,
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const filteredProject = projects.filter((project) => {
        if (filter === "All") return true;
        if (filter === "Front-End")
            return project.role.toLowerCase().includes("front");
        if (filter === "Full-Stack")
            return project.role.toLowerCase().includes("full");
        if (filter === "Mobile")
            return project.role.toLowerCase().includes("mobile");
        return true;
    });

    const filterWithImageProject = () => {
        if (imageFilter === "inlineText") {
            return (
                <div>
                    <InlineText filteredProjects={filteredProject} />
                </div>
            );
        }
        if (imageFilter === "images") {
            return (
                <div>
                    <InlineImage filteredProjects={filteredProject} />
                </div>
            );
        }
    };
    const { scrollYProgress: scrollYProgress3 } = useScroll({
        target: mainContainer,
        offset: ["start end", 'end start']
    })
    return (
        <>
            <div ref={mainContainer} className="flex justify-center items-center p-[0px_20px]">
                <div className="mt-[60px] flex flex-col lg:mt-[60px]">
                    <div>
                        <h1
                            className={`text-[36px] ml-[20px] md:text-[46px] lg:text-[66px] xl:text-[72px] w-full max-w-[360px] md:max-w-[420px] lg:max-w-[720px] xl:max-w-[1020px] md:ml-[80px] lg:ml-[100px] ${ubuntu.className}`}
                        >
                            {t.work.title}
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-y-2 md:ml-[80px] lg:ml-[100px]">

                        <div className="grid grid-cols-2 gap-3 w-full my-8 lg:my-0 lg:flex lg:w-auto lg:gap-0">
                            {filters.map((btn, index) => (
                                <div key={index} onClick={() => setFilter(btn)}>
                                    <FilterButton count={counts[btn]} filter={filter} btn={btn}>
                                        {btn}
                                    </FilterButton>
                                </div>
                            ))}
                        </div>


                        {isTablet ? (
                            <div className="flex gap-3">
                                {filterWithImage.map((btn, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setImageFilter(btn.value)}
                                    >
                                        <InlineButton
                                            imageFilter={imageFilter}
                                            btn={btn.value}
                                        >
                                            {btn.icon}
                                        </InlineButton>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    {filterWithImageProject()}
                </div>
            </div>
            <CurveTransition progress={scrollYProgress3} />
            <Footer />
        </>
    );
};

export default WorkPage;
