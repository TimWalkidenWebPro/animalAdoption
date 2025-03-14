import {handleRichText} from "@/lib/utils";
import FAQs from "@/components/Global/FAQs";
import ContactForm from "@/components/Forms/ContactForm";
import {getAdvert} from "@/lib/utilsClient";
import Advert from "@/components/Global/Advert";

type props = {
    blok: {
            Heading: string;
            Content: string;
            formDescription: string;
            formHeading: string;
            formImage: {filename: string};
            FAQDescription: string;
            FAQS: question[],
            formButton: string,
            inquiryReasons: string[],
            includeAdvert: boolean,

    }
}

type question = {
    Image: {
        filename: string,
    },
    Heading: string,
    content: string,
    questions: {
        question: string,
        answer: string,
    }[]

};

const contactPage = async (params:props) => {
    console.log(params);
    let advertData = null;
    if(params.blok.includeAdvert) {
        advertData = await getAdvert();
    }
    return (
        <div className='my-8 xl:my-24 max-w-6xl xl:mx-auto mx-4'>
            <h1 className="font-bold text-4xl mb-4 text-center"
                dangerouslySetInnerHTML={{__html: handleRichText(params.blok.Heading)?.__html ?? ""}}/>
            <p className="text-base text-center xl:w-1/2 mx-auto" > {params.blok.Content} </p>

            <div className="my-36 grid xl:grid-cols-2 gap-12 xl:mb-52 md-16">
                <div className="border-8 border-foreground rounded-3xl p-8 ">
                    <h2 className='font-bold text-xl mb-4'>{params.blok.formHeading}</h2>
                    <p className='text-base'>{params.blok.formDescription}</p>
                    <ContactForm buttonText={params.blok.formButton} inquiryReasons={params.blok.inquiryReasons} />
                </div>
                <div className="items-center justify-center hidden xl:flex">
                    <img src={params.blok.formImage.filename} alt="contact" width='400'/>
                </div>
            </div>
            {<FAQs blok={params.blok.FAQS[0]}/>}
            {
                advertData && (
                    <Advert advert={advertData} />
                )
            }
        </div>
    )
}

export default contactPage;