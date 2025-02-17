'use client';

import { useState } from 'react';
import submitContactForm from '@/actions/submitContactForm'
import Anaglyph from '@/components/Anaglyph';
import Field from '@/components/Field';
import Form from '@/components/Form';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/FormSubmitButton';
import { useGoogleRecaptchaContext } from '@/providers/GoogleRecaptchaProvider';
import classes from './contact.module.css';

const initialState = {
  message: '',
}

export default function Contact() {
    const [inputStates, setInputStates] = useState({});
    const { loadReCaptcha } = useGoogleRecaptchaContext();

    return (
        <div className="h-full w-full flex flex-wrap items-center justify-center py-24 min-h-screen">
                <div className="w-full p-10 xl_p-24 flex items-center justify-center flex-col">
                    <Anaglyph component="div" className="title-hero mb-12">Say Hi!</Anaglyph>
                    <p className="mb-16">Send me a message using the form below!</p>
                    <div className="w-full max-w-5xl">
                        <Form
                            submitAction={submitContactForm}
                            initialState={initialState}
                            inputStates={inputStates}
                            className="w-full"
                            id="contact-form"
                        >
                            <Field inputId="contact-email" label="Email Address">
                                <FormInput
                                    type="email"
                                    name="senderEmail"
                                    setFormInputDirty={setInputStates}
                                    id="contact-email"
                                    required
                                    onFocus={loadReCaptcha}
                                    onClick={loadReCaptcha}
                                />
                            </Field>
                            <Field inputId="contact-name" label="Name">
                                <FormInput
                                    type="text"
                                    name="senderName"
                                    setFormInputDirty={setInputStates}
                                    id="contact-name"
                                    required
                                    onFocus={loadReCaptcha}
                                    onClick={loadReCaptcha}
                                />
                            </Field>
                            <Field inputId="contact-message" label="Message">
                                <FormInput
                                    type="textarea"
                                    name="message"
                                    setFormInputDirty={setInputStates}
                                    id="contact-message"
                                    required
                                    rows={1}
                                    onFocus={loadReCaptcha}
                                    onClick={loadReCaptcha}
                                />
                            </Field>
                            <SubmitButton
                                recaptchaFormId="contact-form"
                                additionalClasses={classes.submitButton}
                            >
                                Send
                            </SubmitButton>
                        </Form>
                    </div>
                </div>
                
        </div>
    )
}