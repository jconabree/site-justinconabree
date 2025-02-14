import Link from 'next/link';

import classes from './not-found.module.css';
 
export default function NotFound() {
    return (
        <main className={classes.main}>
            <h1>Not Found</h1>
            <p>Could not find requested page</p>
            <p>
                <Link href="/">Go Home</Link>
            </p>
        </main>
    );
}