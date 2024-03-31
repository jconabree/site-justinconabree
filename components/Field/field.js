import classes from './field.module.css';

const Field = (props) => {
    const { children, inputId, label, after } = props;

    const rootClass = after ? classes.fieldWithAfter : classes.field;

    return (
        <div className={rootClass}>
            {label ? (
                <label className={classes.label} htmlFor={inputId}>
                    <span>{label}</span>
                </label>
            ) : null}
            {children}
            {after ? (
                <div className={classes.after}>
                    {after}
                </div>
            ) : null}
        </div>
    );
}

export default Field;