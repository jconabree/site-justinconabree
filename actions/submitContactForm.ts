'use server';

import { sendMail } from '@/api/email';

export default async function submitForm(initialState: any, formData: FormData): Promise<{ [key: string]: string; }> {
    const fromEmail = formData.get('senderEmail') as string;
    const fromName = formData.get('senderName') as string;
    const bodyText = formData.get('message') as string;

    if (!fromEmail) {
        return {
            error: 'Please enter your email'
        };
    }

    if (!fromName) {
        return {
            error: 'Please enter your name'
        };
    }

    if (!bodyText) {
        return {
            error: 'Please enter a message'
        };
    }

    const success = await sendMail(
        fromEmail,
        fromName,
        'Justinconabree.com Contact Form',
        bodyText
    );

    if (!success) {
        return {
            error: 'Something went wrong! Please try again or reach out on socials.'
        }
    }

    return {
        message: 'Your message has been sent! I\'ll respond as soon as possible. Take care! :)'
    }
}