'use client';

import { useState } from 'react';
import submitContactForm from '@/actions/submitContactForm'
import Field from '@/components/Field';
import Form from '@/components/Form';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/FormSubmitButton';

const initialState = {
  message: '',
}
 
export default function Contact() {
    const [inputStates, setInputStates] = useState({});

    return (
        <div className="h-full w-full flex flex-wrap items-center justify-center py-24 min-h-screen">
            <div className="w-full flex flex-wrap gap-4 px-10 items-center justify-evenly columns">
                <div className="flex-grow max-w-4xl">
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
                            />
                        </Field>
                        <Field inputId="contact-name" label="Name">
                            <FormInput
                                type="text"
                                name="senderName"
                                setFormInputDirty={setInputStates}
                                id="contact-name"
                                required
                            />
                        </Field>
                        <Field inputId="contact-message" label="Message">
                            <FormInput
                                type="textarea"
                                name="message"
                                setFormInputDirty={setInputStates}
                                id="contact-message"
                                required
                                rows={6}
                            />
                        </Field>
                        <SubmitButton recaptchaFormId="contact-form">Send</SubmitButton>
                    </Form>
                </div>
                <div className="">
                    <div className="title-h1">Contact</div>
                    <div>Socials</div>
                </div>
            </div>
        </div>
    )
}