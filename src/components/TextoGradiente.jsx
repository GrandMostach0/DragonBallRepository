import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TextoConGradiente({ texto, colores }) {

  const text = texto;

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  //validacion para saber si obtengo todos los 3 colores
  const coloresValidos = Array.isArray(colores) && colores.length >= 3 ? colores : ["#6dd5ed", "#2193b0", "#f7797d"];
  const gradiente = `linear-gradient(to right, ${coloresValidos[0]}, ${coloresValidos[1]}, ${coloresValidos[2]})`;

  return (
    <div className="inline-block md:block">

      <h1
        key={texto}
        className="inline-block bg-clip-text text-transparent text-4xl font-extrabold md:text-5xl lg:text-7xl"
        aria-label={texto}
        style={{backgroundImage: gradiente}}
        >
          {texto.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial="hidden"
              animate="visible"
              variants={letterAnimation}
              transition={{ delay: index * 0.1, duration: 0.5 }} // Ajusta el delay para velocidad
            >
              {char}
            </motion.span>
          ))}
        </h1>
    </div>
  );
}