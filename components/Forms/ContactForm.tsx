"use client"
import {FormEvent, useState} from "react";
import {error} from "next/dist/build/output/log";

type props = {
    buttonText: string;
    inquiryReasons: string[]
}

const ContactForm = ({buttonText = 'Submit', inquiryReasons}: props) => {
    const disableContact = process.env.NEXT_PUBLIC_REACT_DISABLE_CONTACT === 'true';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [inquiry, setInquiry] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(disableContact);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const  handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setDisableSubmit(true);
        try {
            const response = await fetch('/api/contact', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    inquiry: inquiry,
                }),
            });
            const result = await response.json();
            if (response.ok) {
               console.log('success');
                setDisableSubmit(false);
                setSuccess(true);
            } else {
                setError(result.error);
                setDisableSubmit(false);
            }
        } catch (error: any) {
            setError(error.message);
            setDisableSubmit(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">

            <label htmlFor="name" className='font-bold mb-2'>Name:</label>
            <input type="text" className='mb-4 border-2 border-foreground rounded p-2' value={name} onChange={(e) => {setName(e.target.value)}} id="name" name="name" required aria-required="true" placeholder="E.g. Enter first name"/>

            <label htmlFor="email" className='font-bold mb-2'>Email:</label>
            <input type='email' className='mb-4 border-2 border-foreground rounded p-2' value={email} onChange={(e) => {setEmail(e.target.value)}} id='email' name="email" required aria-required="true" placeholder="E.g. Enter email"/>

            <label htmlFor='inquiry' className='font-bold mb-2'>I would like to inquiry about</label>
            <select name='inquiry' className='mb-4 border-2 border-foreground rounded p-2' value={inquiry} onChange={(e) => {setInquiry(e.target.value)}} id='inquiry'>
                <option value="" disabled>Select an option</option>
                {inquiryReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                ))}
            </select>


            <label htmlFor='message' className='font-bold mb-2'>Message:</label>
            <textarea required id="message" className='mb-4 border-2 border-foreground rounded p-2' value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder='Extra info for example animal refernce number'></textarea>

            {
                success && (
                    <div className="bg-foregroundLight rounded-lg p-2 mb-4">
                        <span className='font-bold'>Thank you!</span> We've received your message and will follow up shortly.
                    </div>
                )
            }

            {
                error !== '' && (
                    <div className="bg-red-400 rounded-lg p-2 mb-4">
                        {error}
                    </div>
                )
            }

            <button disabled={disableSubmit} className='bg-foreground rounded-xl w-3/4 py-2 mx-auto' type="submit">{buttonText}</button>
        </form>
    )
}

export default ContactForm;