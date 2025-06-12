import { useState, useEffect } from "react";
import { SearchIc } from "../assets/Icons/SunIc";
import { motion } from "framer-motion";

export default function Buscardor({ onSelectCharacter }){
    const [solicitud, setSolicitud] = useState('');
    const [sugerencias, setSugerencias] = useState([]);

    useEffect(() => {
    const fetchSugerencias = async () => {
      if (solicitud.length < 2) {
        setSugerencias([]);
        return;
      }

      try {
        const response = await fetch(`https://dragonball-api.com/api/characters?name=${solicitud}`);
        const data = await response.json();
        setSugerencias(data);
      } catch (error) {
        console.error("Error buscando sugerencias:", error);
      }
    };

    fetchSugerencias();
  }, [solicitud]);

    return (
        <div className="relative">
            <div className="flex items-center text-xs sm:text-base gap-2 border-none rounded-lg px-2 sm:px-4 py-1 bg-slate-900/50 dark:bg-slate-100/50 text-white dark:text-black">
                <motion.input
                    type="text"
                    placeholder="Ingresar nombre"
                    className="placeholder:text-white dark:placeholder:text-black border-none rounded-lg px-2 sm:px-4 py-1 outline-0"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    value={solicitud}
                    onChange={(e) => setSolicitud(e.target.value)}
                />
                <SearchIc />
            </div>

            {sugerencias.length > 0 && (
                <div
                    className="absolute mt-1 px-4 py-2 rounded-lg shadow-xl bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-black">
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {sugerencias.map((personaje) => (
                            <motion.li 
                                whileHover={{ scale: 1.05 }}
                                key={personaje.id}
                                className="cursor-pointer"
                                onClick={() => {
                                    onSelectCharacter(personaje.id);
                                    setSolicitud('');
                                    setSugerencias([]);
                                }}
                            >
                                {personaje.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            )}
        </div>
    )
}