"use client";

import { useState } from 'react';
import { Form as InformedForm, Input, TextArea, Select } from 'informed';
import { useGoogleRecaptchaContext } from '@/providers/GoogleRecaptchaProvider';
import Checkbox from '@/components/Checkbox';
import Field from '@/components/Field';
import Button from '@/components/Button';
import Socials from '@/components/Socials';

import classes from './form.module.css';

const FieldInput = (props) => {
    const { type, ...rest } = props;

    switch (type) {
        case 'single_line_text':
            return <Input type="text" {...rest} />;
        case 'multi_line_text':
            return <TextArea rows={6} {...rest} />
        default:
            return <Input type={type} {...rest} />
    }
}

const Form = (props) => {
    const {
        id: formId,
        name: formName,
        fieldGroups,
        configuration,
        displayOptions,
        legalConsentOptions,
        showSocials
    } = props;

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { getRecaptchaData } = useGoogleRecaptchaContext();

    const onSubmit = ({ values }) => {
        console.log(values);
        setLoading(true);
        setError(false);

        (async() => {
            const recaptchaId = `${formId}_${formName}`.replaceAll(/[^A-Za-z\/_]/g, '');
            const recaptchaToken = await getRecaptchaData(recaptchaId);

            const valueEntries = Object.entries(values);
            const selectedCommunications = valueEntries.filter(([name, value]) => {
                return name.includes('communication::') && value;
            }).map(([name]) => {
                return name.split('::')[1];
            });
            const hasConsentToProcess = legalConsentOptions?.type !== 'explicit_consent_to_process' || valueEntries.find(([name]) => {
                return name.includes('consent::');
            });
            const fieldEntries = valueEntries.filter(([name]) => {
                return !name.includes('communication::') && !name.includes('consent::');
            });

            const response = await fetch(
                '/api/hubspot/submit',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        formId,
                        recaptchaToken,
                        formData: {
                            fields: fieldEntries.map(([fieldName, value]) => {
                                const [name, objectTypeId] = fieldName.split('::');
                                return {
                                    objectTypeId,
                                    name,
                                    value
                                }
                            }),
                            legalConsentOptions: {
                                consent: {
                                    consentToProcess: Boolean(hasConsentToProcess),
                                    text: legalConsentOptions.consentToProcessText || legalConsentOptions.communicationConsentText,
                                    communications: legalConsentOptions.communicationsCheckboxes.map((checkbox) => {    
                                        return {
                                            value: selectedCommunications.includes(checkbox.subscriptionTypeId.toString()),
                                            subscriptionTypeId: checkbox.subscriptionTypeId,
                                            text: checkbox.label
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            );
            
            if (!response.ok) {
                console.error('Failed to submit form', response.status, response.statusText);
                setError('An error occured while submitting the form')
            }

            const result = await response.json();

            setSuccess(result.data.inlineMessage);
        })()
    }

    if (success) {
        return (
            <div className="pt-24 text-xl" dangerouslySetInnerHTML={{ __html: success }} />
        );
    }

    if (!fieldGroups) {
        return 'no field groups';
    }

    const consentToProcess = legalConsentOptions?.type === 'explicit_consent_to_process' ? (
        <Checkbox
            id={`consent-${formId}`}
            name={`consent::${formId}`}
            label={legalConsentOptions.consentToProcessText}
            required
        />
    ) : null;

    const consentToCommunicate = legalConsentOptions?.communicationsCheckboxes.length ? (
        <>
            <div dangerouslySetInnerHTML={{ __html: legalConsentOptions.communicationConsentText }} />
            {legalConsentOptions.communicationsCheckboxes.map((consentCheckbox) => {
                const id = `communication-${formId}-${consentCheckbox.subscriptionTypeId}`;

                return (
                    <Checkbox
                        key={id}
                        id={id}
                        name={`communication::${consentCheckbox.subscriptionTypeId}`}
                        required={consentCheckbox.required}
                        label={(
                            <span dangerouslySetInnerHTML={{ __html: consentCheckbox.label }} />
                        )}
                    />
                );
            })}
        </>
    ) : null;

    return (
        <InformedForm onSubmit={onSubmit}>
            {error && (
                <div>
                    Error: {error}
                </div>
            )}
            {fieldGroups.map((fieldGroup, index) => {
                const { fields } = fieldGroup;

                if (!fields.length) {
                    return null;
                }

                return (
                    <div key={`fieldGroup-${index}`} className={`${classes.fieldGroup} ${Math.min(12, fields.length)}`}>
                        {fields.map((field) => {
                            return (
                                <Field key={field.name} label={field.placeholder} inputId={`${formId}-${field.name}`}>
                                    <FieldInput
                                        id={`${formId}-${field.name}`}
                                        type={field.hidden ? 'hidden' : field.fieldType}
                                        name={`${field.name}::${field.objectTypeId}`}
                                        required={field.required}
                                        placeholder=" "
                                    />
                                </Field>
                            )
                        })}
                    </div>
                )
            })}
            {consentToProcess}
            {consentToCommunicate}
            <div className={classes.actions}>
                <Button priority="primary" type="submit">{displayOptions.submitButtonText}</Button>
            </div>
            {showSocials && <Socials />}
        </InformedForm>
    )
};

export default Form;