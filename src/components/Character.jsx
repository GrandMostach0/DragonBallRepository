import { useState } from "react";

import { Informacion, InfoTransformaciones } from "./InformacionAdicional";


export function Character({
    image,
    name,
    transformaciones,
    afilacion,
    raza,
    poder,
    genero, funcion}) {

    const [opSeleccionada, setOpSeleccionada] = useState(0);
    const listaOpciones = ['Información', 'Evoluciones'];

    const switchInformation = () => {
        switch(opSeleccionada){
            case 0:
                return <Informacion poder={poder} rice={raza} genero={genero}/>
            case 1:
                return <InfoTransformaciones evoluciones={transformaciones} onSelectCharacter={funcion}/>
            default:
                return null;
        }
    }

    return(
        <div className="text-center text-slate-950 dark:text-slate-50">
            <div className="flex items-center gap-5 justify-center py-2">
                <p className="tag">{afilacion}</p>
                <p className="tag">{raza}</p>
            </div>

            <img
                src={image}
                alt={name}
                className="min-h[300px] max-h-[400px] lg:w-[30%] m-auto"
            />
            <h1 className="text-lg md:text-2xl font-bold my-2">{name}</h1>

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