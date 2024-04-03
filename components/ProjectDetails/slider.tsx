'use client'
// import { userAgent } from 'next/server';
// import { headers } from 'next/headers'

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

interface SliderProps {
    children: React.ReactNode;
}

export default function Slider(props: SliderProps) {
	const { children } = props;
    // const { device } = userAgent({ headers: headers() });
    // const deviceType = ['mobile', 'tablet'].includes(device.type || '') ? device.type : 'desktop';

    return (
        <Carousel
            responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 1,
                  slidesToSlide: 1
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 1,
                  slidesToSlide: 1
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  slidesToSlide: 1
                }
            }}
            // ssr
            infinite
			centerMode
			itemClass="react-multi-carousel-item content-center px-2"
            // deviceType={deviceType}
        >
          {children}
        </Carousel>
    )
}