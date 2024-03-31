"use client";

import classes from './testServices.module.css';

export default function TestServices() {
    return (
        <div className={classes.root}>
            <div className={classes.details}>
                <div className={classes.title}>Curabitur suscipit magna eu felis vestibulum ullamcorper</div>
                <div className={classes.textWrapper}>
                    <p>Vivamus aliquam ligula ut eros tincidunt, gravida pellentesque nisl dignissim.
                    Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                    Sed sed ex tincidunt, auctor libero vel, finibus ante. Praesent at ornare erat, vel commodo risus.
                    Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                    Morbi mattis neque massa, eu efficitur lorem porttitor in.
                    Mauris sit amet metus iaculis, efficitur ligula vitae, luctus lacus.</p>
                    <p>Vivamus aliquam ligula ut eros tincidunt, gravida pellentesque nisl dignissim.
                    Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                    Sed sed ex tincidunt, auctor libero vel, finibus ante. Praesent at ornare erat, vel commodo risus.
                    Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                    Morbi mattis neque massa, eu efficitur lorem porttitor in.
                    Mauris sit amet metus iaculis, efficitur ligula vitae, luctus lacus.</p>
                </div>
            </div>
            <div className={classes.wheelContainer}>
                <div className={classes.wheelContent}>
                    <div className={classes.innerWheel} id="circle" />
                    <div className={classes.serviceInfo}>
                        <div className={classes.serviceTitle}>Service 1</div>
                        <div className={classes.serviceDescription}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                        </div>
                    </div>
                    <div className={classes.serviceInfo}>
                        <div className={classes.serviceTitle}>Service 2</div>
                        <div className={classes.serviceDescription}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                        </div>
                    </div>
                    <div className={classes.serviceInfo}>
                        <div className={classes.serviceTitle}>Service 3</div>
                        <div className={classes.serviceDescription}>
                            Cras pulvinar tristique felis, at sodales quam. Fusce ultricies quam nec ex tempor elementum.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}