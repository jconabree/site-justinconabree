import Link from 'next/link';
import { Metadata } from 'next';

import classes from './not-found.module.css';
 
export default function NotFound() {
    return (
        <main className={classes.main}>
            <h1>Oops..</h1>
            <p className="py-12 text-lg">This page doesn't seem to exist. Try another one?</p>
            <p>
                <Link href="/" className="button-primary py-3 px-8 text-lg block max-w-max">
                    <span className="button-content">Go Home</span>
                </Link>
            </p>
        </main>
    );
};

export const metadata: Metadata = {
	title: "404 | Justin Conabree",
	description: "Unfortunately this page was not found. Better luck next time!",
    robots: {
        index: false,
        follow: false
    }
};