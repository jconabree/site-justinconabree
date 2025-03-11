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
import { getImageSize } from '@/util/images';

import classes from './images.module.css';

interface ImagesProps {
    assets: IPortfolioItem['richMediaCollection']['items']
    title: string;
    isPage?: boolean;
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
	const { assets, title, isPage } = props;
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
                    beforeChange={(_, next) => { setSmallIndex(next) }}
                    nextArrow={<NextArrow />}
                    prevArrow={<PrevArrow />}
                >
                    {assets.map(({ asset, poster }, index) => {
                        const image = asset;
    
                        const alt = `${title} - ${image.title}`;
                        const { width, height } = getImageSize(image.width, image.height, 1300);

                        return (
                            <div key={image.url} className="relative !flex justify-center items-center">
                                {image.contentType.includes('video') ? (
                                    <video
                                        src={image.url}
                                        width={image.width}
                                        height={image.height}
                                        title={image.title}
                                        controls
                                        muted
                                        poster={poster.url}
                                        preload="none"
                                    />
                                ) : (
                                    <>
                                        <Image
                                            src={image.url}
                                            width={width}
                                            height={height}
                                            sizes="60vw"
                                            alt={alt}
                                            className="max-h-full"
                                            priority={isPage && index < 3}
                                        />
                                        <button
                                            className="absolute top-1 right-1 md_top-4 md_right-4 bg-white rounded-full p-1.5 md_p-4 border-black border-2"
                                            onClick={() => { setFullOpen(true); }}
                                        >
                                            <MaximizeIcon className="w-3 h-3 md_w-6 md_h-6" />
                                        </button>
                                    </>
                                )}
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
                        {assets.map(({ asset }, index) => {
                            const image = asset;
                            const alt = `${title} - full size`;

                            return (
                                <div className={classes.fullSizeSlide} key={image.url}>
                                    {image.contentType.includes('video') ? (
                                        <video
                                            src={image.url}
                                            width={image.width}
                                            height={image.height}
                                            title={image.title}
                                            controls
                                            muted
                                            className={classes.fullSizeVideo}
                                        />
                                    ) : (
                                        <div className={classes.fullSizeImage} style={{ backgroundImage: `url(${image.url})` }} aria-label={alt} role="img" />
                                    )}
                                </div>
                            );
                        })}
                    </Slick>
                </div>
            </Modal>
		</>
    )
}