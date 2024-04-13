'use client'

import { useEffect, useState } from 'react';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';
import { IPortfolioItem } from '@/components/ProjectList/projectList';
import Modal from '@/components/Modal';

interface ImagesProps {
    images: IPortfolioItem['imagesCollection']['items']
    title: string;
}

export default function Images(props: ImagesProps) {
	const { images, title } = props;
    const [smallCarousel, setSmallCarousel] = useState<Slick|null>(null);
    const [fullCarousel, setFullCarousel] = useState<Slick|null>(null);
    const [isFullOpen, setFullOpen] = useState<boolean>(false);

    const onFullClose = () => {
        console.log(fullCarousel);
        // const currentSlide = fullCarousel!.state.currentSlide;
        // smallCarousel!.slickGoTo(currentSlide);

        setFullOpen(false);
    }

    useEffect(() => {
        if (isFullOpen && fullCarousel && smallCarousel) {
            // fullCarousel.slickGoTo(
            //     smallCarousel.state.currentSlide
            // );
            console.log(smallCarousel);
        }
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
                    arrows={false} // TODO fix arrow styles making container bigger
                >
                    {images.map((image, index) => {
                        const alt = `${title} image ${index + 1}`;

                        return (
                            <button
                                key={image.url}
                                onClick={() => { setFullOpen(true); }}
                            >
                                <Image
                                    src={image.url}
                                    width={image.width}
                                    height={image.height}
                                    alt={alt}
                                    className="max-h-full"
                                />
                            </button>
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
                <Slick
                    ref={(carousel: Slick) => {
                        setFullCarousel(carousel);
                    }}
                    infinite
                    centerMode
                    centerPadding="10%"
                >
                    {images.map((image, index) => {
                        const alt = `${title} image ${index + 1}`;

                        return (
                            <Image
                                key={image.url}
                                src={image.url}
                                width={image.width}
                                height={image.height}
                                alt={alt}
                            />
                        );
                    })}
                </Slick>
            </Modal>
		</>
    )
}