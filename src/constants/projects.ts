export type Project = {
    title: string;
    src: string;
    color: string;
    year: string;
    role: string;
    /** empty = no public link, the card is not clickable */
    link: string;
};

export const projects: Project[] = [
    {
        title: "UBCab",
        src: "project/ubcab.png",
        color: "#d8d8d2",
        year: "2026",
        role: "Flutter mobile developer",
        link: ""
    },
    {
        title: "Treelings",
        src: "project/treelings.png",
        color: "#c3cfa8",
        year: "2026",
        role: "Flutter mobile developer",
        link: ""
    },
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

export default projects;
