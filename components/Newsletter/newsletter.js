import React from 'react';
import { ArrowRight } from 'react-feather';

import Field from '@/components/Field';

import classes from './newsletter.module.css';

const Newsletter = (props) => {
    return (
        <div className={classes.root}>
            <div className={classes.newsletterTitle}>Newsletter</div>
            <p>Lorem ipsum</p>
            <div className={classes.input}>
                <Field
                    label="Email Address"
                    inputId="newsletter-email"
                    after={(
                        <button type="button">
                            <ArrowRight />
                        </button>
                    )}
                >
                    <input id="newsletter-email" type="text" placeholder=" " />
                </Field>
            </div>
        </div>
    );
};

export default Newsletter;