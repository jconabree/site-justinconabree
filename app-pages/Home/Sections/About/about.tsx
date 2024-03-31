import classes from './about.module.css';

export default function About() {
    return (
        <div className="h-full w-full flex items-center justify-center py-24">
            <div className="flex flex-wrap gap-4 max-w-7xl px-10 items-center justify-center">
                <div className={classes.attributeItem}>Full-stack Developer</div>
                <div className={classes.attributeItem}>Problem Solver</div>
                <div className={classes.attributeItem}>Highly Adaptive</div>
                <div className={classes.attributeItem}>Constantly Learning</div>
                <div className={classes.attributeItem}>Product Innovation</div>
                <div className={classes.attributeItem}>Proactive</div>
                <div className={classes.attributeItem}>Coding Standards</div>
                <div className={classes.attributeItem}>Process Implementation</div>
                <div className={classes.attributeItem}>Performance Analysis</div>
                <div className={classes.attributeItem}>Code Optimization</div>
                <div className={classes.attributeItem}>Team Player</div>
                <div className={classes.attributeItem}>Leadership</div>
                <div className={classes.attributeItem}>Agile Project Management</div>
                <div className={classes.attributeItem}>Cross Functional Team Management</div>
                <div className={classes.attributeItem}>Stakeholder Communications</div>
            </div>
        </div>
    );
}