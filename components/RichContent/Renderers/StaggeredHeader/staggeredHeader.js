import TestTransitionGroup from '@/components/TestTransitionGroup';

import classes from './staggeredHeader.module.css';

const StaggeredHeader = (props) => {
    const { text, transitionType, elementTag: Component } = props;

    const textItems = text.split(' ').map((itemText, index) => {
        return (
            <span
                key={itemText}
                className={classes.textItem}
                style={{ '--index': `${index}em` }}
            >
                {itemText}
            </span>
        );
    })

    return (
        <Component className={classes.header}>
            <TestTransitionGroup
                id="header-1"
                items={textItems}
            />
        </Component>
    )
};

export default StaggeredHeader;