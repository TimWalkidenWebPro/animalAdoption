import {NextRequest, NextResponse} from "next/server";

export async function POST(request) {
    try {
        const disableContact = process.env.NEXT_PUBLIC_REACT_DISABLE_CONTACT === 'true';
        if(disableContact) {
            return NextResponse.json({error: 'Contact form currently disabled'}, {status: 400});
        }

        const {name, email, message, inquiry} = await request.json();

        if(!name || email || !message || !inquiry) {
            return NextResponse.json({error: 'Missing required parameters'}, {status: 400});
        }

        return NextResponse.json({message: 'Message has been sent.'}, {status: 200});
    } catch (error) {
        console.error(error, 'Contact Form');
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}