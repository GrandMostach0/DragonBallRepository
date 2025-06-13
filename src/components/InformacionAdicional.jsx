
export const Informacion = ({poder, rice, genero, planeta}) => {
    return(
        <section>
            <div className="grid grid-cols-4 gap-2">
                <div>
                    <p className="text-slate-950 dark:text-slate-50">Ki</p>
                    <p className="text-sm text-slate-800 dark:text-slate-100 font-extrabold">{poder}</p>
                </div>

                <div>
                    <p className="text-slate-950 dark:text-slate-50">Raza</p>
                    <p className="text-sm text-slate-800 dark:text-slate-100 font-extrabold">{rice}</p>
                </div>

                <div>
                    <p className="text-slate-950 dark:text-slate-50">Género</p>
                    <p className="text-sm text-slate-800 dark:text-slate-100 font-extrabold">{genero}</p>
                </div>

                <div>
                    <p className="text-slate-950 dark:text-slate-50">Plenta</p>
                    <p className="text-sm text-slate-800 dark:text-slate-100 font-extrabold">{planeta.name}</p>
                </div>
            </div>

            <img src={planeta.image} alt={planeta.name} className="my-3 w-[90px] h-[90px] object-cover m-auto rounded-full opacity-70" title={planeta.name}/>
        </section>

    )
}

export const InfoTransformaciones = ({ evoluciones }) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {evoluciones.map((trans, index) => (
                <div
                    key={index}
                    className="cursor-pointer hover:scale-110">
                    <img loading="lazy" src={trans.image} alt="" className="w-[60px] h-[60px] object-contain bg-gray-200/10 dark:bg-slate-900/10 rounded-full px-2 py-1 m-auto"/>
                    <p className="text-sm">{trans.name}</p>
                </div>
            ))}
        </div>
    )
}