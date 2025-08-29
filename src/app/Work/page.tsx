"use client";
import { Ubuntu } from "next/font/google";
import { JSX, useEffect, useState } from "react";
import FilterButton from "../common/FilterButtonsOfWork";
import InlineText from "./components/InlineText";
import { Grid3x2, Rows4 } from "lucide-react";
import InlineButton from "../common/ProjectsInlineButton";
import InlineImage from "./components/InlineImage";
import { link } from "fs";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});

const projects = [
    {
        title: "Workplace 2.0",
        src: "project/vibemesh.png",
        color: "#b0b076",
        year: "2025",
        role: "Full-stack developer",
        link: "https://workplace-2-0.vercel.app/"
    },
    {
        title: "Sainkanzlei.com",
        src: "project/sainkanzlei.png",
        color: "#c2c2b4",
        year: "2025",
        role: "Front-end developer",
        link: "https://sainkanzlei.com/"
    },
    {
        title: "Food delivery",
        src: "project/fooddelivery.png",
        color: "#a6a6a6",
        year: "2024",
        role: "Full-stack developer",
        link: "https://food-delivery-front-end-sand.vercel.app/"
    },
    {
        title: "Movie app",
        src: "project/movieapp.png",
        color: "#b0b076",
        year: "2024",
        role: "Full-stack developer",
        link: "https://movie-app-rosy-mu.vercel.app/"
    },
    {
        title: "To Do app",
        src: "project/todolist.jpg",
        color: "#ffe0e0",
        year: "2024",
        role: "Front-end developer",
        link: "https://todo-kappa-murex.vercel.app/"
    },
    {
        title: "Snake game",
        src: "project/snakegame.png",
        color: "#c2c2b4",
        year: "2024",
        role: "Front-end developer",
        link: "https://snake-snowy-psi.vercel.app/"
    },
    {
        title: "Weather App",
        src: "project/weatherapp.png",
        color: "#a6a6a6",
        year: "2024",
        role: "Full-stack developer",
        link: "https://weather-app-eight-gold-39.vercel.app/"
    },
];

type FilterType = "All" | "Front-End" | "Full-Stack";
type FilterProjectWithImageAndText = "inlineText" | "images";

const WorkPage = () => {
    const [isTablet, setIsTablet] = useState(false);
    const [filter, setFilter] = useState<FilterType>("All");
    const [imageFilter, setImageFilter] =
        useState<FilterProjectWithImageAndText>("inlineText");

    const filters: FilterType[] = ["All", "Front-End", "Full-Stack"];

    // ✅ FIX: make it objects instead of JSX directly
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

    return (
        <>
            <div className="flex justify-center items-center p-[0px_20px]">
                <div className="mt-[60px] flex flex-col lg:mt-[60px]">
                    <div>
                        <h1
                            className={`text-[36px] ml-[20px] md:text-[46px] lg:text-[66px] xl:text-[72px] w-[360px] md:ml-[80px] md:w-[420px] lg:w-[720px] xl:w-[820px] lg:ml-[100px] ${ubuntu.className}`}
                        >
                            Creating next level digital products
                        </h1>
                    </div>
                    <div className="flex justify-between md:ml-[80px] lg:ml-[100px]">

                        <div className="flex">
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
        </>
    );
};

export default WorkPage;
