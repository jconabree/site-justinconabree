import classes from './field.module.css';

interface FieldProps {
    children: React.ReactNode;
    inputId?: string;
    label?: string;
    after?: React.ReactNode;
}

const Field = (props: FieldProps) => {
    const { children, inputId, label, after } = props;

    const rootClass = after ? classes.fieldWithAfter : classes.field;

    return (
        <div className={rootClass}>
            {label && (
                <label className={classes.label} htmlFor={inputId}>
                    <span>{label}</span>
                </label>
            )}
            {children}
            {after && (
                <div className={classes.after}>
                    {after}
                </div>
            )}
        </div>
    );
}

export default Field;