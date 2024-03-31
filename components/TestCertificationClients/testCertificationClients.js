"use client"

import { useEffect, useMemo, useRef, useState } from 'react';

import classes from './testCertificationClients.module.css';

export default function TestCertificationClients() {
    return (
        <div className={classes.root}>
            <div className={classes.titleBar}>
                <div className={classes.title}>Certifications.</div>
            </div>
            <div className={classes.certificationList}>
                <div className={classes.certificationItem}>
                    <div className={classes.placeHolderImage} />
                </div>
                <div className={classes.certificationItem}>
                    <div className={classes.placeHolderImage} />
                </div>
                <div className={classes.certificationItem}>
                    <div className={classes.placeHolderImage} />
                </div>
                <div className={classes.certificationItem}>
                    <div className={classes.placeHolderImage} />
                </div>
            </div>
            <div className={classes.titleBar}>
                <div className={classes.title}>Happy clients.</div>
            </div>
            <div className={classes.clientList}>
                <div className={classes.clientItem}>
                    <div className={classes.clientLogo}>
                        <div className={classes.clientLogoPlaceholder} />
                    </div>
                    <div className={classes.clientContent}>
                        <div className={classes.clientName}>Strategium RH, Inc.</div>
                        <div className={classes.text}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                            Sed sed ex tincidunt, auctor libero vel, finibus ante.
                        </div>
                    </div>
                </div>
                <div className={classes.clientItem}>
                    <div className={classes.clientLogo}>
                        <div className={classes.clientLogoPlaceholder} />
                    </div>
                    <div className={classes.clientContent}>
                        <div className={classes.clientName}>Strategium RH, Inc.</div>
                        <div className={classes.text}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                            Sed sed ex tincidunt, auctor libero vel, finibus ante.
                        </div>
                    </div>
                </div>
                <div className={classes.clientItem}>
                    <div className={classes.clientLogo}>
                        <div className={classes.clientLogoPlaceholder} />
                    </div>
                    <div className={classes.clientContent}>
                        <div className={classes.clientName}>Strategium RH, Inc.</div>
                        <div className={classes.text}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                            Sed sed ex tincidunt, auctor libero vel, finibus ante.
                        </div>
                    </div>
                </div>
                <div className={classes.clientItem}>
                    <div className={classes.clientLogo}>
                        <div className={classes.clientLogoPlaceholder} />
                    </div>
                    <div className={classes.clientContent}>
                        <div className={classes.clientName}>Strategium RH, Inc.</div>
                        <div className={classes.text}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                            Sed sed ex tincidunt, auctor libero vel, finibus ante.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}