import { Checkbox as InformedCheckbox } from 'informed';

import classes from './checkbox.module.css';

const Checkbox = (props) => {
    const { id, name, label, ...rest } = props;

    return (
        <label htmlFor={id} className={classes.label}>
            <InformedCheckbox id={id} name={name} {...rest} />
            <span className={classes.labelText}>{label}</span>
        </label>
    )
};

export default Checkbox;