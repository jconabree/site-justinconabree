"use client"

import { useEffect, useMemo, useRef, useState } from 'react';

import classes from './testNews.module.css';

export default function TestNews() {
    const numberOfSlides = 6;
    const [isLoading, setIsLoading] = useState(true);
    const [activeSlideIndex, setActiveSlideIndex] = useState(Math.min(numberOfSlides, 3));    

    const track = useRef();

    const offset = useMemo(() => {
        if (!track.current) {
            return 332 + 150;
        }

        return activeSlideIndex * 332 + 150;
    }, [activeSlideIndex, isLoading]);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleNextClick = () => {
        setActiveSlideIndex((current) => {
            return Math.min(current + 1, numberOfSlides);
        })
    }

    const handlePrevClick = () => {
        setActiveSlideIndex((current) => {
            return Math.max(0, current - 1);
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.titleBar}>
                <div className={classes.title}>In the news</div>
                <div className={classes.sliderControls}>
                    <button
                        type="button"
                        className={classes.sliderPrev}
                        onClick={handlePrevClick}
                    >{`Prev`}</button>
                    <button
                        type="button"
                        className={classes.sliderNext}
                        onClick={handleNextClick}
                    >{`Next`}</button>
                </div>
            </div>
            <div className={classes.slider}>
                <div className={classes.sliderTrack} ref={track} style={{ transform: `translateX(calc(100% - ${offset}px))`}}>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                    <div className={classes.slide}>
                        <div className={classes.slideImage}></div>
                        <div className={classes.slideContent}>
                            <div className={classes.slideTitle}>Slide 1</div>
                            <div className={classes.slideText}>
                                Ut convallis risus tellus, a condimentum neque pulvinar eget. Etiam id sagittis libero.
                                Morbi mattis neque massa, eu efficitur lorem porttitor in.
                            </div>
                        </div>
                        <div className={classes.slideAction}>Read More</div>
                    </div>
                </div>
            </div>
        </div>
    )
}