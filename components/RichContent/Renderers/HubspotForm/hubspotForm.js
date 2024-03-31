import React from 'react';
import Image from 'next/image';

import { hubspot } from '@/api';

import Form from './form';
import classes from './hubspotForm.module.css';

const HubspotForm = async (props) => {
    const {
        title,
        formId,
        width,
        align,
        image,
        ...formSettings
    } = props;

    const { data: formData, error } = await hubspot.getFormData(formId);

    if (error) {
        return 'Error loading form';
    }

    if (!formData) {
        return null;
    }

    const formWidth = width || 'full';
    const isFullWidth = width === 'full';

    return (
        <div className={`${classes.root} justify-${!isFullWidth ? align : 'center'} hubspot-form`}>
            <div className={`${classes.formColumn} xl_w-${formWidth}`}>
                {title ? (
                    <div className={classes.title}>{title}</div>
                ) : null}
                <Form
                    {...formSettings}
                    {...formData}
                />
            </div>
            {!isFullWidth && image ? (
                <div className={classes.contentColumn} style={{ backgroundImage: `url(${image.url})` }} />
            ) : null}
        </div>
    )
};

export default HubspotForm;