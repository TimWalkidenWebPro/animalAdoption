'use client'
import {useState} from "react";
import {motion} from "framer-motion";

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
                    animate={{backgroundColor: isOpen ? 'var(--foreground-light)' : ''}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className='border-4 border-foreground rounded-xl px-2 py-4 mb-4'>
            <button className="font-bold text-base cursor-pointer flex justify-between w-full" onClick={() => {
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
                <p className="text-base mt-2">{answer}</p>
            </motion.div>
        </motion.div>
    )
}

const FAQs = (props :propTypes) => {
    return <div className={`
     my-36 max-w-6xl xl:mx-auto mx-4 grid xl:grid-cols-2 gap-12 xl:justify-between `}>

        <div className='hidden xl:flex items-center justify-start '>
            <img src={props.blok.Image.filename} className='' alt="" width='400'/>
        </div>

        <div className="">
            <h1 className="font-bold text-4xl mb-4"> {props.blok.Heading}</h1>
            <p className="text-base mb-6">{props.blok.content}</p>
            <div>
                {props.blok.questions.map((q, index: number) => (
                    <FaqsItem answer={q.answer} key={index} question={q.question} />
                ))}
            </div>
        </div>


    </div>
}

export default FAQs;