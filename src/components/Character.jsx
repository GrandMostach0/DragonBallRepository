import { useEffect, useState } from "react";
import { Informacion, InfoTransformaciones } from "./InformacionAdicional";
import { motion } from "framer-motion";

export function Character({
    image,
    name,
    transformaciones,
    afilacion,
    raza,
    poder,
    genero, funcion, planetaOrigen, loading }) {

    const [opSeleccionada, setOpSeleccionada] = useState(0);
    const listaOpciones = Array.isArray(transformaciones) && transformaciones.length > 0 ? ['Información', 'Transformaciones'] : ['Información'];

    useEffect(() => {
        if (opSeleccionada === 1 && listaOpciones.length === 1) {
            setOpSeleccionada(0);
        }
    }, [transformaciones]);


    const switchInformation = () => {
        switch(opSeleccionada){
            case 0:
                return <Informacion poder={poder} rice={raza} genero={genero} planeta={planetaOrigen}/>
            case 1:
                return <InfoTransformaciones evoluciones={transformaciones} onSelectCharacter={funcion}/>
            default:
                return null;
        }
    }

    return(
        <div className="text-center text-slate-950 dark:text-slate-50 mb-10">
            <div className="flex items-center gap-5 justify-center py-2">
                <p className="tag">{afilacion}</p>
                <p className="tag">{raza}</p>
            </div>

            <motion.img
                key={image} // importante para reiniciar animación si la imagen cambia
                src={image}
                alt={name}
                className="w-[150px] h-[270px] lg:w-[35%] md:h-[auto] m-auto object-contain"
                animate={loading ? { opacity: [0.2, 1, 0.2] } : { opacity: 1 }}
                loading="lazy"
                transition={loading ? { duration: 1, repeat: Infinity } : { duration: 0.3 }}
            />

            <h1 className="text-lg md:text-2xl font-semibold my-2">{name}</h1>

            <div className="mb-4">
                {listaOpciones.map((opcion, index) => (
                    <p
                        key={index}
                        className={`subOpciones
                            ${opSeleccionada === index ? 'font-semibold bg-white dark:bg-black' : ''}`}
                        onClick={() => setOpSeleccionada(index)}
                    >
                        {opcion}
                    </p>
                ))}
            </div>

            <div>
                {switchInformation ()}
            </div>

        </div>
    )
}