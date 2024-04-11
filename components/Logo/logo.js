import classes from './logo.module.css';

const Logo = (props) => {
    const { width = 300, height, ...rest } = props;

    return (
        <span className="text-lg font-semibold font-header tracking-wide" {...rest}>Justin Conabree</span>
    )

};

export default Logo;