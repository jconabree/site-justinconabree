import RichContent from '@/components/RichContent';

import classes from './circleSection.module.css';

export default function CircleSection(props) {
    const { title, leftContent, bulletPointsCollection } = props;

    return (
        <div className={classes.root}>
            <div className={classes.details}>
                <div className={classes.title}>{title}</div>
                <div className={classes.textWrapper}>
                    <RichContent content={leftContent} />
                </div>
            </div>
            <div className={classes.wheelContainer}>
                <div className={classes.wheelContent}>
                    <div className={classes.innerWheel} id="circle" />
                    {bulletPointsCollection.items.map((bulletPoint) => {
                        return (
                            <div className={classes.serviceInfo} key={bulletPoint.title}>
                                <div className={classes.serviceTitle}>{bulletPoint.title}</div>
                                <div className={classes.serviceDescription}>
                                    {bulletPoint.text}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}