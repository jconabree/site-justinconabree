'use server';

import { sendContactForm } from '@/api/email';
import recaptcha from '@/api/recaptcha';

export default async function submitContactForm(initialState: any, formData: FormData): Promise<{ [key: string]: string; }> {
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

    const recaptchaToken = formData.get('recaptchaToken');
    const isRecaptchaValid = recaptchaToken ? await recaptcha.isValid(recaptchaToken as string, 'contactform', 0.6) : false;

    if (!isRecaptchaValid) {
        return {
            error: 'We were unable to validate ReCAPTCHA. Please try again or reach out on socials.'
        };
    }

    const success = await sendContactForm(
        fromEmail,
        fromName,
        'Justinconabree.com Contact Form',
        bodyText
    );

    if (!success) {
        return {
            error: 'Something went wrong! Please try again or reach out on socials.'
        };
    }

    return {
        message: `Your message has been sent! I'll respond as soon as possible. Take care! :)`
    };
}