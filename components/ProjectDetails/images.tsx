'use client'

import { useEffect, useState } from 'react';
import Slick, { CustomArrowProps } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';
import { IPortfolioItem } from '@/components/ProjectList/projectList';
import Modal from '@/components/Modal';
import MaximizeIcon from '@/icons/Maximize';
import ChevronRightIcon from '@/icons/ChevronRight';
import ChevronLeftIcon from '@/icons/ChevronLeft';

import classes from './images.module.css';

interface ImagesProps {
    images: IPortfolioItem['imagesCollection']['items']
    title: string;
}

const PrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;

    return (
        <button
        onClick={onClick}
            className={classes.slickPrevArrow}
        >
            <ChevronLeftIcon />
        </button>
    )
}

const NextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;

    return (
        <button
            onClick={onClick}
            className={classes.slickNextArrow}
        >
            <ChevronRightIcon />
        </button>
    )
}

export default function Images(props: ImagesProps) {
	const { images, title } = props;
    const [smallCarousel, setSmallCarousel] = useState<Slick|null>(null);
    const [smallIndex, setSmallIndex] = useState<number>(0);
    const [fullCarousel, setFullCarousel] = useState<Slick|null>(null);
    const [fullIndex, setFullIndex] = useState<number>(0);
    const [isFullOpen, setFullOpen] = useState<boolean>(false);

    const onFullClose = () => {
        smallCarousel!.slickGoTo(fullIndex);
        setFullIndex(0);

        setFullOpen(false);
    }

    useEffect(() => {
        if (isFullOpen && fullCarousel && smallCarousel) {
            fullCarousel.slickGoTo(smallIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullCarousel, isFullOpen])

    return (
		<>
            <div className="py-10">
                <Slick
                    ref={(carousel: Slick) => {
                        setSmallCarousel(carousel);
                    }}
                    infinite
                    centerMode
                    centerPadding="25%"
                    adaptiveHeight
                    arrows
                    beforeChange={(current, next) => { setSmallIndex(next) }}
                    nextArrow={<NextArrow />}
                    prevArrow={<PrevArrow />}
                >
                    {images.map((image, index) => {
                        const alt = `${title} image ${index + 1}`;

                        return (
                            <div key={image.url} className="relative">
                                <Image
                                    src={image.url}
                                    width={image.width}
                                    height={image.height}
                                    alt={alt}
                                    className="max-h-full"
                                />
                                <button
                                    className="absolute top-4 right-4 bg-white rounded-full p-4 border-black border-2"
                                    onClick={() => { setFullOpen(true); }}
                                >
                                    <MaximizeIcon />
                                </button>
                            </div>
                        );
                    })}
                </Slick>
            </div>
            <Modal
                isOpen={isFullOpen}
                unmountOnClose
                onClose={onFullClose}
                size="full"
            >
                <div className="w-full h-full">
                    <Slick
                        ref={(carousel: Slick) => {
                            setFullCarousel(carousel);
                        }}
                        infinite
                        centerMode
                        centerPadding="10%"
                        className="w-full h-full"
                        arrows
                        beforeChange={(current, next) => { setFullIndex(next) }}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                    >
                        {images.map((image, index) => {
                            const alt = `${title} image ${index + 1}`;

                            return (
                                <div className={classes.fullSizeSlide} key={image.url}>
                                    <div className={classes.fullSizeImage} style={{ backgroundImage: `url(${image.url})` }} />
                                </div>
                            );
                        })}
                    </Slick>
                </div>
            </Modal>
		</>
    )
}