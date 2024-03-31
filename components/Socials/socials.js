import LinkedIn from './linkedin';
import classes from './socials.module.css';

const Socials = (props) => {
    const { size = 30 } = props;

    return (
        <div className={classes.container}>
            <LinkedIn size={size} />
        </div>
    )
};

export default Socials;