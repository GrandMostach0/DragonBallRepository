import { motion } from "framer-motion";

export function TextoConGradiente({ texto, colores }) {

  const text = texto;

  //validacion para saber si obtengo todos los 3 colores
  const coloresValidos = Array.isArray(colores) && colores.length >= 3 ? colores : ["#6dd5ed", "#2193b0", "#f7797d"];
  const gradiente = `linear-gradient(to right, ${coloresValidos[0]}, ${coloresValidos[1]}, ${coloresValidos[2]})`;

  return (
    <div className="inline-block md:block">

      <h1
        key={text}
        className="inline-block bg-clip-text text-transparent text-4xl font-extrabold md:text-5xl lg:text-7xl"
        aria-label={text}
        style={{backgroundImage: gradiente, WebkitTextStroke: `2px rgba(0, 0, 0, 0.3)`}}>
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial = {{ opacity:0, y:10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}