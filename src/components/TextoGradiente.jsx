import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TextoConGradiente({ imageUrl, texto }) {
  const text = texto;

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [gradient, setGradient] = useState("");
  const imgRef = useRef();

  useEffect(() => {
    const obtenerColoresDominantes = () => {
      const img = imgRef.current;
      if (!img || img.naturalWidth === 0 || img.naturalHeight === 0) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Reducimos el tamaño para mejorar el rendimiento
      const scale = 0.1;
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Obtenemos una muestra de colores representativos
      const sampleColors = [];
      const step = 5; // Saltamos píxeles para mejor rendimiento

      for (let i = 0; i < data.length; i += 4 * step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Ignoramos píxeles transparentes o casi transparentes
        if (a > 128) {
          sampleColors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }

      // Si no hay suficientes colores, usamos un degradado por defecto
      if (sampleColors.length < 2) {
        setGradient("linear-gradient(to right, #4F46E5, #10B981)");
        return;
      }

      // Seleccionamos colores representativos para el degradado
      const color1 = sampleColors[0];
      const color2 = sampleColors[Math.floor(sampleColors.length / 3)];
      const color3 = sampleColors[Math.floor(sampleColors.length * 2 / 3)];
      const color4 = sampleColors[sampleColors.length - 1];

      // Creamos un degradado con múltiples colores
      setGradient(`linear-gradient(to right, ${color1}, ${color2}, ${color3}, ${color4})`);
    };

    const img = imgRef.current;

    if (img && img.complete) {
      obtenerColoresDominantes();
    } else if (img) {
      img.onload = obtenerColoresDominantes;
    }

    return () => {
      if (img) img.onload = null;
    };
  }, [imageUrl]);

  return (
    <div className="inline-block md:block">
      <img
        ref={imgRef}
        src={imageUrl}
        crossOrigin="anonymous"
        alt="imagen para colores"
        className="hidden"
      />
      <motion.h1
        key={texto}
        className="bg-clip-text text-transparent text-4xl font-extrabold md:text-5xl lg:text-7xl"
        style={{ backgroundImage: gradient }}
        aria-label={texto}
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
        </motion.h1>
    </div>
  );
}