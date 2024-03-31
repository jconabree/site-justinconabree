import Image from 'next/image';
import RichContent from '@/components/RichContent';
import classes from './hero.module.css';

const getTailwindHeight = (height) => {
    switch (height) {
        case '1/3':
            return 'oneThird';
        case '1/2':
            return 'half';
        case '2/3':
            return 'twoThirds';
        case 'full':
            return 'screen'
        default:
            return height;
    }
}

const Hero = (props) => {
    const { background, content, width, height, align, justify, textAlign, showScrollHint } = props;
    const {
        url: backgroundUrl,
        contentType = ''
    } = background || {};

    const heroHeight = getTailwindHeight(height);

    const hintClass = showScrollHint ? classes.showScrollIndicator : '';

    const contentClasses = [
        classes.content,
        `w-${width || 'full'}`,
        `items-${align || 'center'}`,
        `justify-${justify || 'left'}`,
        `text-${textAlign || 'center'}`
    ].join(' ');

    const backgroundContent = contentType ? (
        <div className={classes.heroBackground}>
            {contentType.includes('video') ? (
                <video className={classes.video} src={backgroundUrl} type={contentType} playsInline autoPlay muted loop />
            ) : null}
            {contentType.includes('image') ? (
                <Image src={backgroundUrl} />
            ) : null}
        </div>
    ) : null;

    return (
        <div className={`${classes.hero} ${hintClass} xl_h-${heroHeight}`}>
            {backgroundContent}
            {content ? (
                <div className={classes.contentWrapper}>
                    <div className={contentClasses}>
                        <RichContent content={content} />
                    </div>
                </div>
            ) : null}
        </div>
    )
};

export default Hero;