import { useState, useEffect } from "react";
import { SunIc, MoonIc } from "../assets/Icons/SunIc";
import Buscardor from "./Buscardor";
import dragonBall from "../assets/dragonBall.svg"
import { motion } from "framer-motion";

function NavBar({ funcion }) {

    const [dropOpen, setDropOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = (tema) => {
        setTheme(tema);
        setDropOpen(false);
    };

    const toggleDrop = () => {
        setDropOpen(!dropOpen);
    }

    return (
        <div className="flex flex-col xs:flex-row items-center justify-between py-2 px-5 sm:px-10 md:px-10 sticky text-black dark:text-white w-[100%] top-0 left-0 bg-transparent backdrop-blur-[5px]">
            <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="flex items-center gap-3">
                <h1 className="font-extrabold text-2xl sm:text-3xl cursor-default pt-4 pb-2 sm:p-0">
                    DRAGON BALL
                </h1>

                <img src={dragonBall} alt="IconEsfera" className="w-[24px] h-[24px]"/>
            </motion.div>

            <div className="flex items-center justify-between sm:w-[50%] md:w-[60%]">
                <Buscardor onSelectCharacter={ funcion }/>

                <nav className="relative">
                    <button
                        className="px-3 py-2 rounded-lg text-black dark:text-white cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 dark:hover:border-blue-500"
                        onClick={toggleDrop}
                    >
                        {theme === 'light' ? <SunIc /> : <MoonIc />}
                    </button>

                    {dropOpen && (
                        <div className="absolute -left-10 mt-1 px-4 py-2 rounded-lg shadow-xl bg-slate-300 dark:bg-slate-800">
                            <p
                            className="mt-1 px-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-950 cursor-default"
                            onClick={() => toggleTheme("light")}
                            >Light</p>
                            <p
                            className="mt-1 px-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-950 cursor-default"
                            onClick={() => toggleTheme("dark")}
                            >Dark</p>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default NavBar;