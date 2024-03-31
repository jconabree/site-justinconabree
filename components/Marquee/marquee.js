import ReactMarquee from "react-fast-marquee";

import classes from './marquee.module.css';

const Marquee = (props) => {
    const { children, ...marqueeProps } = props;

    return (
        <ReactMarquee {...marqueeProps}>
            <div className={classes.marqueeText}>
                {children}
            </div>
        </ReactMarquee>
    );
};

export default Marquee;