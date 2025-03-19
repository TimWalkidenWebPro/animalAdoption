'use client'
import {useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";

type propTypes = {
    blok: {
        Image: {
            filename: string,
        },
        Heading: string,
        content: string,
        questions: question[]
    }
}

type question = {
    question: string,
    answer: string,
};

const FaqsItem = ({question, answer}: question ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <motion.div initial={false}
                    animate={{backgroundColor: isOpen ? 'var(--foreground-light)' : '', color: isOpen ? 'var(--foreground-light-text)' : ''}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className='border-4 border-foreground rounded-xl px-2 py-4 mb-4'>
            <button className="font-bold text-base text-left cursor-pointer flex justify-between w-full" onClick={() => {
                setIsOpen(!isOpen)
            }}>
                {question}
                <motion.span animate={{rotate: isOpen ? '180deg' : '0deg'}}>
                    <img src='/upArrow.svg' className='mr-2' width='20' height='20' alt='open and close arrow'/>
                </motion.span>
            </button>
            <motion.div
                initial={false}
                animate={{height: isOpen ? 'auto' : '0', opacity: isOpen ? '1' : '0'}}
                transition={{duration: 0.3, ease: 'easeInOut'}} className='overflow-hidden'>
                <p className="text-base mt-2 text-foregroundLightText">{answer}</p>
            </motion.div>
        </motion.div>
    )
}

const itemVariants =  {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ( { opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.5} })
}

const FAQs = (props :propTypes) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    return <div ref={ref} className={`
     my-36 max-w-6xl xl:mx-auto mx-4 grid xl:grid-cols-2 gap-12 xl:justify-between `}>

        <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={1} variants={itemVariants} className='hidden xl:flex items-center justify-start '>
            <img src={props.blok.Image.filename} className='' alt={props.blok.Heading} width='400' loading='lazy'/>
        </motion.div>

        <div >
            <motion.h1 initial='hidden' animate={inView ? 'show' : 'hidden'} custom={2} variants={itemVariants} className="font-bold text-4xl mb-4"> {props.blok.Heading}</motion.h1>
            <motion.p initial='hidden' animate={inView ? 'show' : 'hidden'} custom={3} variants={itemVariants} className="text-base mb-6">{props.blok.content}</motion.p>
            <motion.div initial='hidden' animate={inView ? 'show' : 'hidden'} custom={4} variants={itemVariants}>
                {props.blok.questions.map((q, index: number) => (
                    <FaqsItem answer={q.answer} key={index} question={q.question} />
                ))}
            </motion.div>
        </div>


    </div>
}

export default FAQs;