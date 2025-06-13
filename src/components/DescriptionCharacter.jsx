import { TextoConGradiente } from './TextoGradiente'
import { motion, useInView} from 'framer-motion';
import { useRef } from 'react';

function DescriptionCharacter ({image, name, description, coloresDominantesProps}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    return (
        <div
            ref={ref}
            className=' flex justify-between md:h-[60vh] text-slate-900 dark:text-slate-200'
        >
            <div className='flex-1/2'>
                <h1 className='text-4xl text-center font-extrabold md:text-left md:text-5xl lg:text-7xl'>
                    Dragon Ball - <TextoConGradiente texto={name} colores={coloresDominantesProps}/></h1>
                <p className='text-sm md:font-semibold md:text-base mt-2'>{description}</p>
            </div>

            <div className='hidden lg:block flex-1/6'>
                <motion.img
                    loading='lazy'
                    src={image}
                    alt={name}
                    className='h-[100%] m-auto'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.3, delay: 0.6 }}/>
            </div>
        </div>
    )
}

export default DescriptionCharacter;