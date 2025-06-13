import './App.css'
import NavBar from './components/NavBar'
import { Character } from './components/Character'
import { useEffect, useState } from 'react'
import DescriptionCharacter from './components/DescriptionCharacter'
import Loader from './components/Loader'
import FooterDiv from './components/FooterDiv'
import { motion } from "framer-motion";

function App() {

  const [personaje, setPersonaje] = useState([]);
  const [coloresDominantes, setColoresDominantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonajeById = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
      const data = await response.json();
      setPersonaje(data);
      console.log(data);
      if(data.image) {
        const colores = await extraerColoresDominantes(data.image);
        setColoresDominantes(colores);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPersonajeById(1);
  }, [])

  const extraerColoresDominantes = async (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const scale = 0.05; // Más pequeño que 0.1 para menos datos
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCount = new Map();

        const step = 4 * 10; // Saltar más pixeles para menos análisis
        for (let i = 0; i < imageData.length; i += step) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];
          if (a < 128) continue;

          // Crear clave numérica para evitar string y mejorar velocidad
          const key = (r << 16) + (g << 8) + b;
          colorCount.set(key, (colorCount.get(key) || 0) + 1);
        }

        // Ordenar y mapear a rgb strings
        const sortedColors = [...colorCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([key]) => {
            const r = (key >> 16) & 255;
            const g = (key >> 8) & 255;
            const b = key & 255;
            return `rgb(${r},${g},${b})`;
          });

        resolve(sortedColors.length ? sortedColors : ["#4F46E5", "#10B981", "#22D3EE"]);
      };

      img.onerror = () => {
        resolve(["#4F46E5", "#10B981", "#22D3EE"]);
      };
    });
  };

  const item = {
    hidden: {opacity: 0, y:30 },
    visible: {opacity: 1, y:0 }
  }

  return (
    <div className='h-auto relative overflow-y-hidden overflow-x-hidden md:overflow-y-hidden bg-slate-50/25'>

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {coloresDominantes[0] && (
          <div className="circle c1" style={{ background: coloresDominantes[0] }} />
        )}
        {coloresDominantes[1] && (
          <div className="circle c2" style={{ background: coloresDominantes[1] }} />
        )}
        {coloresDominantes[2] && (
          <div className="circle c3" style={{ background: coloresDominantes[2] }} />
        )}
      </div>

      <NavBar funcion={ fetchPersonajeById }/>

      {loading ? (
        <Loader />
      ) : (
        <motion.div
          className="block mt-[5%]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity:0 },
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
              }
            }
          }}
        >
          <main className='flex flex-col sm:flex-row justify-items-center px-4 sm:gap-10 w-full sm:px-10'>
            <motion.section
              variants={ item }
              className='flex-1/2 md:flex-1/3 lg:flex-1/12'>
              <Character
                name={personaje.name}
                image={personaje.image}
                afilacion={personaje.affiliation}
                raza={personaje.race}
                poder={personaje.ki}
                genero={personaje.gender}
                transformaciones={personaje.transformations}
              />
            </motion.section>

            <motion.section
              variants={ item }
              className='flex-2/3'>
              <DescriptionCharacter
                name={personaje.name}
                image={personaje.image}
                description={personaje.description}
                coloresDominantesProps={coloresDominantes}
              />
            </motion.section>
          </main>
        </motion.div>
      )}

      <FooterDiv />

    </div>
  )
}

export default App
